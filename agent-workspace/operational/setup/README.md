# Operational Setup Index

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, operator
- **Status**: attivo

## Scopo

Guide operative per:
- Setup ambiente locale
- Primo avvio e bootstrap
- Deploy produzione
- Troubleshooting

## File

| File | Contenuto |
|------|-----------|
| `01_local_setup.md` | Setup locale step-by-step |
| `02_first_run_super_bootstrap.md` | Bootstrap primo SUPER |
| `03_mongo_atlas.md` | Configurazione MongoDB Atlas |
| `04_vercel_production.md` | Deploy su Vercel |

## Percorso Consigliato

1. `01_local_setup.md` - Setup iniziale
2. `02_first_run_super_bootstrap.md` - Bootstrap
3. `03_mongo_atlas.md` - Cloud DB (se necessario)
4. `04_vercel_production.md` - Produzione

## Baseline Corrente

- Database obbligatorio in `live`, `demo` e `local`
- Nessun fallback in-memory nell'app
- `MONGODB_URI` con placeholder bloccato in validazione

## Per Troubleshooting

Vedere `project-docs/05_troubleshooting.md`
