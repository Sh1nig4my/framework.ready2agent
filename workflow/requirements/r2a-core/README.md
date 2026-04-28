# R2A Core Requirements

## Scopo

La cartella `workflow/requirements/r2a-core/` contiene la spec didattica viva del Core Ready2Agent.

## Regola principale

- `ready2agent_master_spec_v2_1.md` deve restare allineato riga-per-riga allo stato corrente del repository.
- Non e un archivio statico: e un artefatto didattico operativo per studiare il metodo agentico reale usato in R2A.

## Relazioni

- Runtime reale: `src/`
- Vincoli Core modulari: `documentation/core/`
- Metodo operativo: `documentation/method/`
- Esecuzioni concrete: `workflow/`

## Manutenzione

Quando cambiano tassonomia, vincoli o flussi:

1. aggiorna `documentation/core/` e/o `documentation/method/`;
2. aggiorna i riferimenti in `workflow/` e `prompts/`;
3. aggiorna questa cartella nello stesso change set.
