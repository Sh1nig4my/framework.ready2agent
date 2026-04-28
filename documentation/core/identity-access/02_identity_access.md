# Identity & Access - Modello Ruoli e Permessi

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento formalizza il **modello di identità e accesso** di Ready2Agent.

Definisce:
- Gerarchia ruoli
- Regole di visibilità
- Sistema permessi
- Vincoli operativi

---

## 1. Gerarchia Ruoli

```
┌─────────────────────────────────────────────────────────┐
│                         SUPER                           │
│           (1 solo, bootstrap, accesso totale)            │
└─────────────────────────┬───────────────────────────────┘
                          │ invita
                          ▼
┌─────────────────────────────────────────────────────────┐
│                         ADMIN                           │
│            (default self-only, permessi delegati)       │
└─────────────────────────┬───────────────────────────────┘
                          │ invita
                          ▼
┌─────────────────────────────────────────────────────────┐
│                       OPERATOR                          │
│       (permission map obbligatoria, deny-by-default)    │
└─────────────────────────┬───────────────────────────────┘
                          │ invita
                          ▼
┌─────────────────────────────────────────────────────────┐
│                         USER                            │
│              (registrazione pubblica, nessun permesso)  │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Principio Globale di Visibilità

> **Ogni utente vede solo se stesso, salvo permessi espliciti.**

Questo principio è:
- **Vincolante** per UI
- **Vincolante** per API
- **Enforced** sempre lato server

Non è un'opzione UI: è un vincolo architetturale.

---

## 3. SUPER

### 3.1 Caratteristiche

| Attributo | Valore |
|-----------|--------|
| Quantità | 1 (esattamente uno) |
| Creazione | Solo via `/setup` su database vuoto |
| Accesso | Totale al sistema |
| Permission map | Nessuna (ha tutto) |

### 3.2 Capacità

- ✅ Vede tutto
- ✅ Modifica tutto
- ✅ Invita ADMIN
- ✅ Invita OPERATOR
- ✅ Gestisce utenti
- ✅ Configura sistema

### 3.3 Bootstrap Constraint

Dopo il primo setup:
- **NON esiste** un secondo flusso di creazione SUPER
- L'unico SUPER è quello creato in `/setup`

---

## 4. ADMIN

### 4.1 Caratteristiche

| Attributo | Valore |
|-----------|--------|
| Creazione | Solo da SUPER via invito |
| Visibilità default | Solo se stesso |
| Permission map | Lista limitata |

### 4.2 Permessi Disponibili

```typescript
type AdminPermission =
  | "administrators.viewOthers"   // Vede altri ADMIN
  | "administrators.invite"        // Può invitare ADMIN
  | "administrators.edit"          // Può modificare ADMIN
  | "operators.invite";            // Può invitare OPERATOR
```

### 4.3 Capacità Base (senza permessi delegati)

- ✅ Vede solo se stesso
- ✅ Modifica solo se stesso
- ❌ Non vede altri ADMIN
- ❌ Non può invitare nessuno

### 4.4 Capacità con Delega `administrators.viewOthers`

- ✅ Vede tutti gli ADMIN nel sistema
- ✅ Modifica solo ADMIN invitati da lui (`invitedByUserId`)

### 4.5 Vincoli

- ❌ Non può eliminare il proprio account ADMIN
- ❌ Non può modificare SUPER
- ❌ Non può creare ADMIN (solo SUPER può)
- ✅ Può invitare OPERATOR solo se ha `operators.invite`

---

## 5. OPERATOR

### 5.1 Caratteristiche

| Attributo | Valore |
|-----------|--------|
| Creazione | Da ADMIN o SUPER via invito |
| Visibilità default | Solo se stesso |
| Permission map | **Obbligatoria**, tipizzata, persistita |

### 5.2 Struttura Permission Map

```typescript
interface OperatorPermissionMap {
  // Ambito Operatori
  operators?: {
    read: boolean;
    update: boolean;
    delete?: boolean;
  };

  // Ambito Documenti
  documents?: {
    read: boolean;
    upload: boolean;
    download?: boolean;
    delete?: boolean;
  };

  // Ambito Users
  users?: {
    read: boolean;
    update?: boolean;
  };

  // ... altri ambiti
}
```

### 5.3 Esempio

```typescript
const operatorPermissions: OperatorPermissionMap = {
  operators: { read: true, update: false },
  documents: { read: true, upload: true, download: false, delete: false },
  users: { read: true }
};
```

### 5.4 Regola Deny-by-Default

**Ogni capability è NEGATA per default.**

Anche se un ambito è presente nella mappa:
- Se `read: false` → NON può leggere
- Se `read` è assente → NON può leggere

### 5.5 Vincoli

- ❌ Non può creare ADMIN
- ❌ Non può vedere ADMIN
- ❌ Non può vedere SUPER
- ❌ Può operare solo su OPERATOR invitati da lui (`invitedByUserId`)
- ❌ Non può modificare OPERATOR non invitati da lui

---

## 6. USER

### 6.1 Caratteristiche

| Attributo | Valore |
|-----------|--------|
| Creazione | Registrazione pubblica |
| Visibilità | Solo se stesso |
| Permission map | Nessuna |

### 6.2 Capacità

- ✅ Registrazione self-service
- ✅ Vede solo propri dati
- ✅ Modifica proprio profilo
- ✅ Accede a moduli pubblici

### 6.3 Vincoli

- ❌ Nessuna permission map configurabile
- ❌ Nessun accesso admin/operator
- ❌ Non può invitare nessuno

---

## 7. Flussi di Invito

### 7.1 SUPER → ADMIN

```
SUPER genera link invito
    ↓
ADMIN clicca link, compila form
    ↓
ADMIN creato con invitedByUserId = SUPER.id
```

### 7.2 ADMIN/SUPER → OPERATOR

```
ADMIN/SUPER genera link invito
    ↓
OPERATOR clicca link, compila form
    ↓
OPERATOR creato con:
  - invitedByUserId = ADMIN/SUPER.id
  - permissions = empty (da configurare)
```

### 7.3 Invite Link Flow

```typescript
// Generazione
const inviteToken = await generateInviteToken({
  role: "ADMIN" | "OPERATOR",
  invitedByUserId: actor.id,
  expiresIn: "7d"
});

// Link formato
const inviteLink = `${baseUrl}/invite/${inviteToken}`;
```

---

## 8. Self-Only Policy

### 8.1 Regola Globale

Ogni utente vede e può modificare **solo** le proprie risorse, salvo permessi espliciti.

### 8.2 Implementazione

```typescript
// In service, prima di ogni query
async function getOperator(id: string, actor: SessionActor) {
  // Se non è SUPER e non è il proprietario
  if (actor.role !== "SUPER" && actor.userId !== id) {
    // Se è ADMIN senza viewOthers
    if (actor.role === "ADMIN" && !actor.permissions.includes("administrators.viewOthers")) {
      throw new BusinessError("ACCESS_DENIED");
    }

    // Se è OPERATOR
    if (actor.role === "OPERATOR") {
      throw new BusinessError("ACCESS_DENIED");
    }
  }

  return operatorRepository.findById(id);
}
```

---

## 9. Regole Trasversali

### 9.1 No Escalation Automatica

```
❌ USER non diventa ADMIN automaticamente
❌ ADMIN non diventa SUPER automaticamente
❌ OPERATOR non diventa ADMIN automaticamente
```

### 9.2 Delega Top-Down

```
✅ SUPER delega a ADMIN
✅ ADMIN delega a OPERATOR
❌ USER non delega a nessuno
```

### 9.3 Minimo Accesso come Default

```
✅ Nuovo ADMIN senza permessi = solo se stesso
✅ Nuovo OPERATOR senza permessi = capability map vuota
```

---

## 10. Access Control Flow

```
Request arriva
    ↓
Controller estrae actor dalla session
    ↓
Controller chiama Service
    ↓
Service verifica permessi dell'actor
    ↓
Service applica business logic con vincoli
    ↓
Service chiama Repository
    ↓
Repository esegue query con filtri actor
    ↓
Response torna con dati filtrati
```

---

## 11. Policy di Accesso Centrale

### 11.1 Fonte della Verità

`src/server/lib/auth/access.ts` è la fonte della verità per i controlli di accesso.

### 11.2 Regole Centralizzate

Tutte le verifiche di autorizzazione passano per questo modulo:
- Mai implementare controlli duplicati
- Mai bypassare questa policy

---

## 12. Checklist Conformità

Prima di ogni implementazione identity/access:

- [ ] Verifica che la policy self-only sia rispettata
- [ ] Verifica che ADMIN senza permessi veda solo se stesso
- [ ] Verifica che OPERATOR abbia permission map
- [ ] Verifica che delegatedByUserId sia impostato correttamente
- [ ] Verifica che nessun bypass della policy di accesso

---

## 13. Gap Attuali (da Risolvere)

Secondo `documentation/method/alignment-model/`:

| Gap | Priorità | Note |
|-----|----------|------|
| Self-only non globalmente applicato | P1 | In fase di riallineamento |
| Equivalenze ADMIN=SUPER implicite | P1 | Da rimuovere |
| OPERATOR deny-by-default parziale | P2 | Da completare |

---

*Questo documento definisce il modello identity. Per implementazione, vedere `src/server/lib/auth/access.ts`.*
