/**
 * @file bootstrap.service.ts
 * @description Servizio di bootstrap per il primo setup di Ready2Agent.
 *
 * RESPONSABILITÀ:
 * - Determinare se il sistema richiede il setup iniziale (database vuoto)
 * - Creare il primo account SUPER (unico amministratore globale)
 * - Proteggere le operazioni finché il setup non è completato
 *
 * VINCOLI ARCHITETTURALI:
 * - Solo ed esclusivamente UN account SUPER può esistere
 * - Il SUPER viene creato SOLO via /setup su database completamente vuoto
 * - Dopo il bootstrap, NON esiste modo di creare un secondo SUPER
 * - Le registrazioni pubbliche sono bloccate finché il SUPER non è creato
 *
 * SECURITY:
 * - Password hashed con bcrypt (10 salt rounds)
 * - Audit logging dell'operazione di bootstrap
 * - Validazione input con Zod schema
 *
 * PATTERN:
 * - Service Layer: contains only business logic
 * - No direct database access: uses Repository
 */

import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import { recordAuditEvent } from "@/server/service/audit.service";
import { isDatabaseEnabled } from "@/server/db/mongoose";
import { AppError } from "@/server/errors/AppError";
import { countAllUsers, createUser } from "@/server/repository/users.repository";
import { initializeSuperSchema } from "@/server/lib/bootstrap/validation";

/**
 * Verifica se il sistema richiede il setup iniziale.
 *
 * CONDIZIONI:
 * - Database connesso E
 * - Nessun utente presente nel sistema
 *
 * @returns true se il database è vuoto e serve il setup, false altrimenti
 *
 * @note Se il database non è connesso (isDatabaseEnabled = false),
 *       restituisce false per permettere l'avvio dell'app in ambienti
 *       senza database (es. test, sviluppo locale senza MongoDB).
 */
export async function isFirstRunSetupRequired(): Promise<boolean> {
  if (!isDatabaseEnabled) {
    return false;
  }

  return (await countAllUsers()) === 0;
}

/**
 * Asserta che il sistema sia stato inizializzato (SUPER esiste).
 *
 * UTILIZZO:
 * Chiamare questa funzione PRIMA di:
 * - Registrazione pubblica utenti
 * - Operazioni che richiedono un sistema funzionante
 *
 * @throws AppError("FORBIDDEN") - Se il setup non è stato completato
 *
 * @example
 * ```typescript
 * // Prima di registrare un nuovo utente
 * await assertSystemInitialized();
 * // Ora posso procedere con la registrazione...
 * ```
 */
export async function assertSystemInitialized(): Promise<void> {
  if (await isFirstRunSetupRequired()) {
    throw new AppError(
      "FORBIDDEN",
      "Complete the initial SUPER setup before opening public registration or operational flows.",
    );
  }
}

/**
 * Inizializza il primo account SUPER nel sistema.
 *
 * FLUSSO:
 * 1. Verifica database connesso
 * 2. Valida input con Zod schema
 * 3. Verifica che il database sia vuoto (nessun utente)
 * 4. Hash della password con bcrypt
 * 5. Crea l'utente SUPER con ruolo "SUPER"
 * 6. Registra audit event
 * 7. Restituisce info del nuovo SUPER
 *
 * VINCOLI CRITICI:
 * - Può essere chiamato SOLO una volta (primo avvio)
 * - Il database DEVE essere vuoto
 * - L'utente creato avrà ruolo "SUPER" (l'unico nel sistema)
 *
 * @param input - Payload di setup (email, password, firstName, lastName)
 * @param requestId - ID richiesta per logging/tracing
 * @returns Oggetto contenente userId, email e role del nuovo SUPER
 *
 * @throws AppError("FORBIDDEN") - Database non configurato
 * @throws AppError("VALIDATION_ERROR") - Input non valido
 * @throws AppError("CONFLICT") - Setup già completato (utenti esistenti)
 *
 * @example
 * ```typescript
 * const superUser = await initializeFirstSuperUser({
 *   email: "admin@example.com",
 *   password: "strongPassword123",
 *   firstName: "Admin",
 *   lastName: "User"
 * });
 * ```
 */
export async function initializeFirstSuperUser(
  input: unknown,
  requestId: string = randomUUID(),
) {
  if (!isDatabaseEnabled) {
    throw new AppError(
      "FORBIDDEN",
      "First-run setup is available only when a database connection is configured.",
    );
  }

  const parsed = initializeSuperSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Initial SUPER setup payload is invalid.",
      parsed.error.flatten(),
    );
  }

  if (!(await isFirstRunSetupRequired())) {
    throw new AppError("CONFLICT", "Initial setup is already complete.");
  }

  const now = new Date();
  const passwordHash = await hash(parsed.data.password, 10);

  const user = await createUser({
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    passwordHash,
    status: "ACTIVE",
    deletedAt: null,
    role: "SUPER",
    adminPermissions: null,
    operatorPermissions: null,
    emailVerifiedAt: now,
    termsAcceptedAt: now,
    privacyAcceptedAt: now,
    lastLoginAt: null,
    invitationSentAt: null,
    invitedByUserId: null,
    createdAt: now,
    updatedAt: now,
  });

  await recordAuditEvent({
    requestId,
    actorUserId: user.id,
    action: "bootstrap.super.initialize",
    resource: "bootstrap",
    metadata: { email: user.email },
  });

  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
}
