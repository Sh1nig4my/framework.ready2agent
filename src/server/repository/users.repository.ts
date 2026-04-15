/**
 * @file users.repository.ts
 * @description Repository per l'accesso ai dati degli utenti nel database MongoDB.
 *
 * RESPONSABILITÀ:
 * - Tutte le operazioni CRUD sugli utenti
 * - Mapping tra record MongoDB e oggetti AppUser tipizzati
 * - Normalizzazione dei dati per garantire forma prevedibile
 * - Gestione permessi ADMIN/OPERATOR nei record
 *
 * PATTERN:
 * - Repository Layer: ONLY data access logic
 * - NON contiene logica di business
 * - NON contiene validazione di dominio
 * - MAI chiamare direttamente da Controller o Service
 *
 * MAPPATURA DATI:
 * - I record MongoDB sono mappati in AppUser per garantire type safety
 * - I permessi sono sanitizzati prima del salvataggio
 * - Le date sono gestite con null-coalescing per valori mancanti
 *
 * @see AppUser - Tipo TypeScript per gli utenti
 * @see UserModel - Schema Mongoose per la collection "users"
 */

import { sanitizeAdminPermissions } from "@/shared/auth/admin-permissions.catalog";
import { sanitizeOperatorPermissions, supportsDelegatedPermissions } from "@/shared/auth/permissions.catalog";
import { connectToDatabase } from "@/server/db/mongoose";
import type { AppUser, Role } from "@/server/lib/users/types";
import { UserModel } from "@/server/models/User";

/**
 * Mappa un record MongoDB in un oggetto AppUser tipizzato.
 *
 * @param record - Record grezzo dal database
 * @returns Oggetto AppUser normalizzato
 *
 * OPERAZIONI:
 * - Converte ObjectId in stringa
 * - Gestisce permessi ADMIN con sanitizeAdminPermissions
 * - Gestisce permessi OPERATOR con sanitizeOperatorPermissions
 * - Applica null-coalescing per campi opzionali
 *
 * @note Questa funzione è interna al modulo e garantisce che il resto
 *       dell'applicazione veda SEMPRE una forma prevedibile dei dati utente.
 */
function mapUserRecord(record: Record<string, unknown>): AppUser {
  const role = record.role as Role;

  return {
    id: String(record._id ?? record.id),
    email: String(record.email),
    firstName: String(record.firstName),
    lastName: String(record.lastName),
    passwordHash: String(record.passwordHash),
    status: record.status as AppUser["status"],
    deletedAt: (record.deletedAt as Date | null | undefined) ?? null,
    role,
    adminPermissions: role === "ADMIN" ? sanitizeAdminPermissions(record.adminPermissions) : null,
    operatorPermissions: supportsDelegatedPermissions(role)
      ? sanitizeOperatorPermissions(record.operatorPermissions)
      : null,
    emailVerifiedAt: (record.emailVerifiedAt as Date | null | undefined) ?? null,
    termsAcceptedAt: (record.termsAcceptedAt as Date | null | undefined) ?? null,
    privacyAcceptedAt: (record.privacyAcceptedAt as Date | null | undefined) ?? null,
    lastLoginAt: (record.lastLoginAt as Date | null | undefined) ?? null,
    invitationSentAt: (record.invitationSentAt as Date | null | undefined) ?? null,
    invitedByUserId: record.invitedByUserId ? String(record.invitedByUserId) : null,
    createdAt: (record.createdAt as Date | undefined) ?? new Date(),
    updatedAt: (record.updatedAt as Date | undefined) ?? new Date(),
  };
}

/**
 * Trova un utente per email.
 *
 * @param email - Email dell'utente da cercare
 * @returns AppUser se trovato, null altrimenti
 *
 * @note L'email viene normalizzata in lowercase prima della ricerca
 * @note Il campo deletedAt NON è filtrato: gestire a livello service se necessario
 */
export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const normalizedEmail = email.toLowerCase();
  await connectToDatabase();
  const user = await UserModel.findOne({ email: normalizedEmail }).lean();
  return user ? mapUserRecord(user as Record<string, unknown>) : null;
}

/**
 * Trova un utente per ID.
 *
 * @param id - ID MongoDB dell'utente
 * @returns AppUser se trovato, null altrimenti
 *
 * @note Il campo deletedAt NON è filtrato: gestire a livello service se necessario
 */
export async function findUserById(id: string): Promise<AppUser | null> {
  await connectToDatabase();
  const user = await UserModel.findById(id).lean();
  return user ? mapUserRecord(user as Record<string, unknown>) : null;
}

/**
 * Lista utenti con optional filtro per ruolo.
 *
 * @param filter - Filtro opzionale (solo per ruolo)
 * @returns Array di AppUser, ordinati per createdAt DESC
 *
 * FILTRI APPLICATI:
 * - Se filter.role è specificato, filtra per ruolo
 * - Esclude utenti con status = "INACTIVE" (soft delete)
 *
 * @note Gli utenti inattivi (INACTIVE) sono esclusi per default
 * @note L'ordinamento è per data creazione (più recenti prima)
 */
export async function listUsers(filter?: {
  role?: Role;
}): Promise<AppUser[]> {
  await connectToDatabase();
  const query = {
    ...(filter?.role ? { role: filter.role } : {}),
    status: { $ne: "INACTIVE" },
  };
  const users = await UserModel.find(query).sort({ createdAt: -1 }).lean();
  return users.map((user) => mapUserRecord(user as Record<string, unknown>));
}

/**
 * Conta gli utenti per ruolo specifico.
 *
 * @param role - Ruolo da contare
 * @returns Numero di utenti con quel ruolo (esclusi INACTIVE)
 */
export async function countUsersByRole(role: Role): Promise<number> {
  await connectToDatabase();
  return UserModel.countDocuments({ role, status: { $ne: "INACTIVE" } });
}

/**
 * Conta tutti gli utenti nel sistema.
 *
 * @returns Numero totale di utenti (INCLUSI INATTIVI)
 *
 * @note Questa funzione conta TUTTI gli utenti, inclusi quelli INATTIVI
 *       Usare per verificare se il database è vuoto (bootstrap)
 */
export async function countAllUsers(): Promise<number> {
  await connectToDatabase();
  return UserModel.countDocuments({});
}

/**
 * Crea un nuovo utente nel database.
 *
 * @param input - Dati dell'utente da creare (senza id, o con id opzionale)
 * @returns AppUser appena creato e mappato
 *
 * OPERAZIONI:
 * - Valida e sanitizza permessi ADMIN (solo per ruolo ADMIN)
 * - Valida e sanitizza permessi OPERATOR (solo per ruoli che li supportano)
 * - Imposta createdAt e updatedAt
 * - Crea il record in MongoDB
 *
 * @note Il campo id NON deve essere passato (auto-generato da MongoDB)
 * @note I permessi sono sanitizzati prima del salvataggio
 */
export async function createUser(
  input: Omit<AppUser, "id"> & { id?: string },
): Promise<AppUser> {
  const createdAt = new Date();
  const payload = {
    ...input,
    adminPermissions: input.role === "ADMIN" ? sanitizeAdminPermissions(input.adminPermissions) : null,
    operatorPermissions: supportsDelegatedPermissions(input.role)
      ? sanitizeOperatorPermissions(input.operatorPermissions)
      : null,
    createdAt,
    updatedAt: createdAt,
  };

  await connectToDatabase();
  const user = await UserModel.create(payload);
  return mapUserRecord(user.toObject() as Record<string, unknown>);
}

/**
 * Aggiorna un utente esistente.
 *
 * @param id - ID dell'utente da aggiornare
 * @param patch - Campi da aggiornare (parziali)
 * @returns AppUser aggiornato, o null se non trovato
 *
 * OPERAZIONI:
 * - Se viene cambiato il ruolo, aggiorna/rimuove i permessi di conseguenza
 * - Se adminPermissions è undefined, mantiene quelli esistenti (o li rimuove se ruolo non ADMIN)
 * - Se operatorPermissions è undefined, mantiene quelli esistenti (o li rimuove se ruolo non supportato)
 * - Aggiorna sempre updatedAt
 * - Usa returnDocument: "after" per ottenere il documento aggiornato
 *
 * LOGICA PERMESSI SU CAMBIO RUOLO:
 * - ADMIN -> altro ruolo: adminPermissions diventa null
 * - OPERATOR -> ruolo senza permessi: operatorPermissions diventa null
 * - adminPermissions passato esplicitamente: viene sanitizzato
 * - operatorPermissions passato esplicitamente: viene sanitizzato
 */
export async function updateUser(
  id: string,
  patch: Partial<Omit<AppUser, "id">>,
): Promise<AppUser | null> {
  const nextRole = patch.role;
  const normalizedPatch = {
    ...patch,
    adminPermissions:
      patch.adminPermissions !== undefined
        ? sanitizeAdminPermissions(patch.adminPermissions)
        : nextRole && nextRole !== "ADMIN"
          ? null
          : patch.adminPermissions,
    operatorPermissions:
      patch.operatorPermissions !== undefined
        ? sanitizeOperatorPermissions(patch.operatorPermissions)
        : nextRole && !supportsDelegatedPermissions(nextRole)
          ? null
          : patch.operatorPermissions,
    updatedAt: new Date(),
  };

  await connectToDatabase();
  const user = await UserModel.findByIdAndUpdate(id, normalizedPatch, {
    returnDocument: "after",
  }).lean();
  return user ? mapUserRecord(user as Record<string, unknown>) : null;
}
