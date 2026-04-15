# First-Run SUPER Bootstrap

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer
- **Status**: attivo

---

## Scopo

Questo documento spiega il processo di **bootstrap del primo account SUPER** su database vuoto.

---

## 1. Regola Fondamentale

```
SU DATABASE VUOTO, IL BOOTSTRAP CREA UN SOLO ACCOUNT SUPER.
QUESTO È L'UNICO SUPER DEL SISTEMA.
```

---

## 2. Comportamento Atteso

### 2.1 Flow Automatico

```
1. App avvia
2. Check: database ha utenti?
3. Se NO → redirect a /setup
4. Se YES → proceed normale
```

### 2.2 Form /setup

L'utente compila:
- Email (diventerà SUPER)
- Password
- Conferma password

### 2.3 Post-Creazione

1. SUPER creato in database
2. Hash password con bcrypt
3. Login automatico con credenziali appena inserite
4. Redirect a `/dashboard`

---

## 3. Vincoli Implementativi

### 3.1 Un Solo SUPER

```typescript
// In bootstrap service
async function bootstrapSuper(email: string, password: string) {
  // Check: database vuoto?
  const userCount = await usersRepository.count();
  if (userCount > 0) {
    throw new Error("Bootstrap già completato");
  }

  // Check: non esiste già un SUPER?
  const existingSuper = await usersRepository.findByRole("SUPER");
  if (existingSuper) {
    throw new Error("SUPER già esiste");
  }

  // Crea SUPER
  return usersRepository.create({
    email,
    passwordHash: await hashPassword(password),
    role: "SUPER",
    status: "active",
    invitedByUserId: null
  });
}
```

### 3.2 Nessun Seed Automatico

```
❌ NO account demo creati in build
❌ NO utenti di test precompilati
❌ NO admin@example.com/password
```

### 3.3 Password Requirements

| Requisito | Valore |
|-----------|--------|
| Minimo | 8 caratteri |
| Consigliato | 12+ caratteri |
| Hashed | bcrypt 12 rounds |

---

## 4. Dopo Bootstrap

### 4.1 Cosa Può Fare SUPER

| Azione | Permesso |
|--------|----------|
| Vedere tutto | ✅ |
| Modificare tutto | ✅ |
| Invitare ADMIN | ✅ |
| Invitare OPERATOR | ✅ |
| Configurare sistema | ✅ |

### 4.2 Prossimi Passi

1. SUPER invita primo ADMIN
2. ADMIN invita OPERATOR se necessario
3. USER si registrano pubblicamente

---

## 5. Protezione Post-Bootstrap

### 5.1 Nessun Secondo /setup

Dopo bootstrap:
- `/setup` ritorna 404 o redirect a `/dashboard`
- Unico modo per creare nuovo SUPER: via ADMIN con permesso speciale (futuro)

### 5.2 Recovery

Se perdi l'account SUPER:

```
OPZIONE 1: Reset Database
  - mongosh → use ready2agent → db.dropDatabase()
  - Riavvia → /setup disponibile di nuovo

OPZIONE 2: Manual Update (sperimentale)
  - Accedi direttamente a MongoDB
  - Aggiorna ruolo utente esistente a SUPER
```

---

## 6. Schema SUPER

```typescript
interface SuperUser {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  role: "SUPER";
  status: "active";
  permissions: never; // SUPER non ha permission map
  invitedByUserId: null;
  createdAt: Date;
  updatedAt: Date;
  termsAcceptedAt: Date;
  privacyAcceptedAt: Date;
  lastLoginAt?: Date;
}
```

---

## 7. Security Considerations

### 7.1 Credenziali Sicure

```
✅ Usa password strong (12+ char, mix maiuscole/minuscole/numeri/simboli)
✅ Non condividere credenziali
✅ Usa password manager
```

### 7.2 Accesso Database

```
⚠️ Chi ha accesso a MongoDB può creare utenti
⚠️ Proteggi connection string
⚠️ Usa credenziali MongoDB con permessi minimi
```

---

## 8. Testing Bootstrap

### 8.1 Test Case

```typescript
describe("Bootstrap", () => {
  it("should create SUPER on empty database", async () => {
    // Arrange: database vuoto
    await database.drop();

    // Act
    const superUser = await bootstrapSuper("super@example.com", "password123");

    // Assert
    expect(superUser.role).toBe("SUPER");
    expect(superUser.email).toBe("super@example.com");
  });

  it("should reject if database not empty", async () => {
    // Arrange: database con utente
    await createUser({ role: "USER" });

    // Act & Assert
    await expect(bootstrapSuper("super@example.com", "password123"))
      .rejects.toThrow("Bootstrap già completato");
  });
});
```

---

## 9. Checklist Post-Bootstrap

- [ ] `/setup` redirect funziona su database vuoto
- [ ] Form valida input
- [ ] Password hashed correttamente
- [ ] Login automatico dopo creazione
- [ ] Redirect a `/dashboard`
- [ ] SUPER vede tutti i moduli
- [ ] `/setup` non accessibile dopo bootstrap

---

## 10. Links

- Setup locale: `01_local_setup.md`
- MongoDB Atlas: `03_mongo_atlas.md`
- Deploy: `04_vercel_production.md`

---

*Questo documento è parte della documentazione operativa per developer.*
