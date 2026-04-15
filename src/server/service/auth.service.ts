/**
 * @file auth.service.ts
 * @description Servizio di autenticazione per Ready2Agent.
 *
 * RESPONSABILITÀ:
 * - Autenticazione utenti con credenziali email/password
 * - Registrazione nuovi utenti standard (ruolo USER)
 * - Ri-autenticazione per operazioni sensibili
 * - Rate limiting per prevenire brute force
 * - Audit logging di tutti gli eventi auth
 *
 * PATTERN:
 * - Questo è un Service Layer: contiene SOLO logica di business
 * - Chiama Repository per accesso dati
 * - Non contiene logica di transport/request/response
 * - Propaga errori come AppError con codici mnemonici
 *
 * SECURITY:
 * - Password hashed con bcrypt (10 salt rounds)
 * - Rate limiting configurabile (5 tentativi / 15 minuti)
 * - Account lockout per utenti inattivi/invitati
 * - Audit completo di tutti i tentativi (successi e fallimenti)
 */

import { randomUUID } from "crypto";
import { compare, hash } from "bcrypt";
import { computeSessionExpiry } from "@/server/lib/auth/session-config";
import { assertSystemInitialized } from "@/server/service/bootstrap.service";
import { clearFailedLoginAttempts, assertLoginRateLimit, registerFailedLoginAttempt } from "@/server/lib/auth/rate-limit";
import { recordAuditEvent } from "@/server/service/audit.service";
import { registerUserSchema } from "@/server/dto/auth";
import { AppError } from "@/server/errors/AppError";
import { createUser, findUserByEmail, findUserById, updateUser } from "@/server/repository/users.repository";
import { fullNameOf, type SessionActor } from "@/server/lib/users/types";

/**
 * Registra un evento di audit per le operazioni di autenticazione.
 *
 * @param action - Identificativo dell'azione (es. "auth.login.success", "auth.register.user")
 * @param requestId - ID univoco della richiesta per tracing
 * @param actorUserId - ID dell'utente coinvolto (null per tentativi anonimi)
 * @param metadata - Metadati aggiuntivi (es. email, ruolo, motivo fallimento)
 *
 * @note Questa funzione è interna al modulo e non deve essere esportata.
 *       Per audit generici, usare recordAuditEvent direttamente.
 */
async function recordAuthAudit(
  action: string,
  requestId: string,
  actorUserId?: string | null,
  metadata?: unknown,
) {
  await recordAuditEvent({
    requestId,
    actorUserId: actorUserId ?? null,
    action,
    resource: "auth",
    metadata,
  });
}

/**
 * Autentica un utente con credenziali email/password.
 *
 * FLUSSO:
 * 1. Verifica rate limiting (previene brute force)
 * 2. Cerca utente per email
 * 3. Verifica stato account (attivo, inattivo, invitato)
 * 4. Verifica password con bcrypt.compare()
 * 5. Aggiorna lastLoginAt
 * 6. Registra audit event
 * 7. Restituisce SessionActor per la sessione
 *
 * ERRORI POSSIBILI:
 * - RATE_LIMITED: Troppi tentativi di login
 * - INVALID_CREDENTIALS: Email non trovata o password errata
 * - ACCOUNT_INACTIVE: Account disattivato
 * - ACCOUNT_INVITED: Account ancora in stato "invitato" (da completare)
 *
 * @param email - Email dell'utente
 * @param password - Password in chiaro (verrà confrontata con hash bcrypt)
 * @param remember - Se true, la sessione durerà 30 giorni invece di 24 ore
 * @param requestId - ID richiesta per logging/tracing
 * @returns SessionActor contenente info per la sessione JWT
 *
 * @example
 * ```typescript
 * const actor = await authenticateWithCredentials(
 *   "user@example.com",
 *   "password123",
 *   true // remember me
 * );
 * ```
 */
export async function authenticateWithCredentials(
  email: string,
  password: string,
  remember = false,
  requestId: string = randomUUID(),
): Promise<SessionActor> {
  try {
    await assertLoginRateLimit(email);
  } catch {
    await recordAuthAudit("auth.login.fail", requestId, null, { email, reason: "rate_limited" });
    throw new AppError("RATE_LIMITED", "Too many login attempts. Please try again later.");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    await registerFailedLoginAttempt(email);
    await recordAuthAudit("auth.login.fail", requestId, null, { email, reason: "user_not_found" });
    throw new AppError("INVALID_CREDENTIALS", "Invalid email or password.");
  }

  if (user.status === "INACTIVE") {
    await recordAuthAudit("auth.login.fail", requestId, user.id, { email, reason: "inactive" });
    throw new AppError("ACCOUNT_INACTIVE", "Account is inactive.");
  }

  if (user.status === "INVITED") {
    await recordAuthAudit("auth.login.fail", requestId, user.id, { email, reason: "invite_pending" });
    throw new AppError("ACCOUNT_INVITED", "Invitation must be completed before signing in.");
  }

  const passwordMatches = await compare(password, user.passwordHash);
  if (!passwordMatches) {
    await registerFailedLoginAttempt(email);
    await recordAuthAudit("auth.login.fail", requestId, user.id, { email, reason: "bad_password" });
    throw new AppError("INVALID_CREDENTIALS", "Invalid email or password.");
  }

  await clearFailedLoginAttempts(email);
  await updateUser(user.id, { lastLoginAt: new Date() });
  await recordAuthAudit("auth.login.success", requestId, user.id, {
    email: user.email,
    role: user.role,
  });

  const signedInAt = Date.now();

  return {
    userId: user.id,
    email: user.email,
    name: fullNameOf(user),
    role: user.role,
    permissions: {
      admin: user.adminPermissions ?? [],
      operator: user.operatorPermissions ?? null,
    },
    remember,
    signedInAt,
    expiresAt: computeSessionExpiry(signedInAt, remember),
    reauthAt: null,
  };
}

/**
 * Registra un nuovo utente standard con ruolo USER.
 *
 * FLUSSO:
 * 1. Verifica che il sistema sia inizializzato (SUPER esiste)
 * 2. Valida l'input con Zod schema
 * 3. Verifica che l'email non sia già registrata
 * 4. Hash della password con bcrypt (10 salt rounds)
 * 5. Crea l'utente con ruolo USER
 * 6. Registra audit event
 *
 * VINCOLI:
 * - Solo utenti con ruolo USER possono registrarsi pubblicamente
 * - ADMIN, OPERATOR, SUPER vengono creati solo via invito
 * - L'email deve essere unica nel sistema
 *
 * @param input - Payload di registrazione (email, password, firstName, lastName)
 * @param requestId - ID richiesta per logging/tracing
 * @returns Oggetto contenente userId e email del nuovo utente
 *
 * @throws AppError("VALIDATION_ERROR") - Input non valido
 * @throws AppError("CONFLICT") - Email già registrata
 */
export async function registerStandardUser(input: unknown, requestId: string = randomUUID()) {
  await assertSystemInitialized();

  const parsed = registerUserSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError("VALIDATION_ERROR", "Registration payload is invalid.", parsed.error.flatten());
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    throw new AppError("CONFLICT", "A user with this email already exists.");
  }

  const passwordHash = await hash(parsed.data.password, 10);
  const now = new Date();

  const user = await createUser({
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    passwordHash,
    status: "ACTIVE",
    role: "USER",
    adminPermissions: null,
    operatorPermissions: null,
    emailVerifiedAt: now,
    termsAcceptedAt: now,
    privacyAcceptedAt: now,
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  });

  await recordAuthAudit("auth.register.user", requestId, user.id, { email: user.email });

  return {
    userId: user.id,
    email: user.email,
  };
}

/**
 * Ri-autentica un attore esistente per operazioni sensibili.
 *
 * UTILIZZO:
 * Questa funzione viene chiamata prima di operazioni critiche come:
 * - Cambio password
 * - Modifica email
 * - Eliminazione account
 * - Modifica permessi
 *
 * FLUSSO:
 * 1. Verifica che l'utente esista ancora
 * 2. Verifica che la password sia corretta
 * 3. Registra audit event
 * 4. Restituisce timestamp di ri-autenticazione
 *
 * @param actor - SessionActor corrente (già autenticato)
 * @param password - Password corrente per verifica
 * @param requestId - ID richiesta per logging/tracing
 * @returns Oggetto con timestamp di ri-autenticazione
 *
 * @throws AppError("UNAUTHENTICATED") - Sessione non più valida
 * @throws AppError("INVALID_CREDENTIALS") - Password errata
 */
export async function reauthenticateActor(
  actor: SessionActor,
  password: string,
  requestId: string = randomUUID(),
) {
  const user = await findUserById(actor.userId);
  if (!user) {
    throw new AppError("UNAUTHENTICATED", "Session is no longer valid.");
  }

  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    throw new AppError("INVALID_CREDENTIALS", "Current password is invalid.");
  }

  const reauthAt = Date.now();
  await recordAuthAudit("auth.reauth.success", requestId, actor.userId, { email: actor.email });

  return { reauthAt };
}
