# Requirements Branching Guide

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
- i file requirement sono input per i prompt in `workflow/maintenance-workflow/`.

## Flusso operativo consigliato

1. Scegli la sottocartella branch da implementare.
2. Esegui `workflow/maintenance-workflow/prompt-01-generate-integration-chapters.md`.
3. Esegui `workflow/maintenance-workflow/prompt-02-generate-integration-tasks.md`.
4. Lavora nel flow generato sotto `workflow/<FLOW_NAME>/`.
5. Aggiorna tracker locale e globale dopo ogni task.

## Branch attuali

- `workflow/requirements/r2a-core/`
- `workflow/requirements/r2a-enterprise-userdetail/`

## Nota su r2a-core

`workflow/requirements/r2a-core/` e una spec didattica viva: va mantenuta allineata riga-per-riga allo stato corrente di R2A.
