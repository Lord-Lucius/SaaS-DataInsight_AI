NAME = SaaS-DataInsight-AI

.PHONY: all build up down logs stop restart clean re help

all: build up logs

re: down clean build up logs

help:
	@echo "=== $(NAME) ==="
	@echo ""
	@echo "Available commands:"
	@echo "  make build     - Build Docker images"
	@echo "  make up        - Start containers"
	@echo "  make down      - Stop containers and remove volumes"
	@echo "  make logs      - Follow container logs"
	@echo "  make stop      - Stop containers (keep volumes)"
	@echo "  make restart   - Restart containers"
	@echo "  make clean     - Remove containers and volumes"
	@echo "  make re        - Full rebuild from scratch"
	@echo ""

build:
	docker compose build

up:
	docker compose up -d
	@echo "✅ Services started!"
	@echo "   API : http://localhost:8000"
	@echo "   Docs: http://localhost:8000/docs"

down:
	docker compose down -v
	@echo "✅ Services stopped"

logs:
	docker compose logs -f

stop:
	docker compose stop
	@echo "✅ Services stopped"

restart: down up

clean:
	docker compose down -v --rmi local
	@echo "✅ Containers, volumes and local images removed"

fclean: down clean
