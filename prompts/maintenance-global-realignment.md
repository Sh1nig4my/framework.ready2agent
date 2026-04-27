# Prompt: Maintenance Global Realignment

## Scopo

Eseguire una revisione profonda dell'intero repository per riallineare codice, documentazione, link interni e standard operativi dopo refactor strutturali.

## Input

- repository completo
- eventuale richiesta specifica utente

## Flusso Operativo Obbligatorio

1. Leggi `README.md`.
2. Leggi `documentation/quickstart/agent_start_here.md`.
3. Leggi `documentation/operational/README.md`.
4. Leggi `documentation/operational/spec/README.md`.
5. Leggi `documentation/operational/alignment/README.md`.
6. Leggi `documentation/operational/execution/README.md`.
7. Leggi `workflow/README.md`.
8. Leggi `workflow/requirements/ready2agent_master_spec_v2_1.md`.
9. Mappa path e riferimenti obsoleti.
10. Correggi codice e documentazione nello stesso ciclo.
11. Esegui validazioni.

Nota: `documentation/R2A_full-ai-context.md` resta il contesto completo da passare a chat LLM esterne o analisi estese, non e obbligatorio in ogni avvio operativo.

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
