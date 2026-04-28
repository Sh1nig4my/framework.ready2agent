# Prompt: Maintenance Global Realignment

## Scopo

Eseguire una revisione profonda dell'intero repository per riallineare codice, documentazione, link interni e standard operativi dopo refactor strutturali.

## Input

- repository completo
- eventuale richiesta specifica utente

## Flusso Operativo Obbligatorio

1. Leggi `README.md`.
2. Leggi `documentation/quickstart/agent_start_here.md`.
3. Leggi `documentation/README.md`.
4. Leggi `documentation/core/README.md`.
5. Leggi `documentation/method/README.md`.
6. Leggi `workflow/README.md`.
7. Leggi `prompts/README.md`.
8. Leggi il branch requisiti in `workflow/requirements/<branch>/`.
9. Mappa path e riferimenti obsoleti.
10. Correggi codice e documentazione nello stesso ciclo.
11. Esegui validazioni.

Nota: in caso di refactor strutturale/documentale ampio, leggere anche `documentation/R2A_full-ai-context.md`.

## Checklist Tecnica

- Verifica link interni e riferimenti cross-folder.
- Verifica che il codice applicativo sia referenziato sotto `src/`.
- Verifica route API esposte e copertura minima di controlli auth/permessi.
- Verifica sicurezza baseline: gestione env, cookie/sessione, validazione input, no segreti hardcoded.
- Evidenzia gap verso conformita UE applicabile (privacy/security by design, minimizzazione dati, auditabilita).
- Generalizza stringhe/valori hardcoded dove necessario.
- Allinea documenti root, `documentation/`, `workflow/`, `prompts/`.

## Output Atteso

1. Elenco file aggiornati.
2. Elenco drift corretti (path, link, nomenclatura, standard).
3. Esito validazioni (`lint`, `test`, `build`).
4. Rischi residui o azioni successive consigliate.
