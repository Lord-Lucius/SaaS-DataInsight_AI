# SaaS-DataInsight-AI

Backend FastAPI + PostgreSQL.

## Démarrage rapide

```bash
cp .env.example .env   # remplir les valeurs
make build
make up
```

API disponible sur `http://localhost:8000`  
Swagger UI sur `http://localhost:8000/docs`

## Commandes

| Commande       | Description                        |
|----------------|------------------------------------|
| `make build`   | Build les images Docker            |
| `make up`      | Lance les conteneurs               |
| `make down`    | Stoppe et supprime les volumes     |
| `make logs`    | Suit les logs en temps réel        |
| `make restart` | Redémarre les conteneurs           |
| `make clean`   | Supprime conteneurs + images local |

## Structure

```
.
├── backend/
│   ├── core/
│   │   └── config.py       # Settings (pydantic-settings)
│   ├── models/
│   │   └── models.py       # Modèles SQLModel
│   ├── routes/             # Routers FastAPI
│   ├── services/           # Logique métier
│   └── main.py             # Point d'entrée
├── .env                    # Variables d'environnement (non commité)
├── .env.example            # Template à commiter
├── docker-compose.yml
├── Makefile
└── requirements.txt
```
