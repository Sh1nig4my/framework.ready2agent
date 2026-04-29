# Requirements Branching Guide

## Metadata

- Ultimo aggiornamento: 2026-04-29
- Stato: attivo

## Scopo

La cartella `workflow/requirements/` contiene gli input funzionali per i flussi implementativi.

Regola base: una sottocartella = un ramo implementativo.

## Struttura

```text
workflow/requirements/
├── README.md
├── <branch-1>/
│   └── <spec-files>
└── <branch-2>/
    └── <spec-files>
```

## Convenzioni

- naming sottocartelle in kebab-case;
- ogni branch contiene solo specifiche del proprio ramo;
- evitare mix di requisiti non correlati nella stessa sottocartella;
- i file requirement sono input per i prompt in `prompts/maintenance-workflow/`.
- ogni `workflow/requirements/<branch>/README.md` deve includere in testa un badge stato con uno dei valori: `completed | in-progress | not-started`.

### Badge stato standard

Usare questo formato all'inizio del README della specifica:

```markdown
Stato specifica: [not-started]
```

Valori ammessi:

- `[completed]`
- `[in-progress]`
- `[not-started]`

## Flusso operativo consigliato

1. Scegli la sottocartella branch da implementare.
2. Esegui `prompts/maintenance-workflow/prompt-01-generate-integration-chapters.md`.
3. Esegui `prompts/maintenance-workflow/prompt-02-generate-integration-tasks.md`.
4. Lavora nel flow generato sotto `workflow/<FLOW_NAME>/`.
5. Aggiorna tracker locale e globale dopo ogni task.

## Branch attuali

- `workflow/requirements/r2a-core/`
- `workflow/requirements/r2a-enterprise-userdetail/`

## Stato avanzamento specifiche

| Specifica | Stato | Flusso workflow | Nota |
|---|---|---|---|
| `workflow/requirements/r2a-core/` | `completed` | `workflow/R2A-integration/` | Flow completato e chiuso |
| `workflow/requirements/r2a-enterprise-userdetail/` | `not-started` | `none` | Flusso non ancora creato |

## Nota su r2a-core

`workflow/requirements/r2a-core/` e una spec didattica viva: va mantenuta allineata riga-per-riga allo stato corrente di R2A.
