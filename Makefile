NAME		= SaaS-DataInsight-AI
COMPOSE		= docker compose
API_SERVICE	= fastapi
DB_SERVICE	= db

# Colors
GREEN	= \033[0;32m
YELLOW	= \033[0;33m
BLUE	= \033[0;34m
CYAN	= \033[0;36m
RED		= \033[0;31m
BOLD	= \033[1m
RESET	= \033[0m

.PHONY: all help dev \
		build up down stop restart re \
		logs logs-api logs-db \
		ps status shell db-shell \
		clean fclean prune \
		test lint format

# ============================================================
# Default
# ============================================================

all: help

dev: build up logs

re: down build up logs

# ============================================================
# Help
# ============================================================

help:
	@echo ""
	@echo "$(BOLD)$(CYAN)=== $(NAME) ===$(RESET)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)Lifecycle:$(RESET)"
	@echo "  $(GREEN)make dev$(RESET)       - $(BOLD)Build + start + follow logs (main dev command)$(RESET)"
	@echo "  $(GREEN)make build$(RESET)     - Build Docker images"
	@echo "  $(GREEN)make up$(RESET)        - Start containers in detached mode"
	@echo "  $(GREEN)make down$(RESET)      - Stop containers and remove volumes"
	@echo "  $(GREEN)make stop$(RESET)      - Stop containers (keep volumes)"
	@echo "  $(GREEN)make restart$(RESET)   - Restart containers"
	@echo "  $(GREEN)make re$(RESET)        - Full rebuild from scratch"
	@echo ""
	@echo "$(BOLD)$(YELLOW)Debug:$(RESET)"
	@echo "  $(BLUE)make logs$(RESET)      - Follow all container logs"
	@echo "  $(BLUE)make logs-api$(RESET)  - Follow API logs only"
	@echo "  $(BLUE)make logs-db$(RESET)   - Follow DB logs only"
	@echo "  $(BLUE)make ps$(RESET)        - List running containers"
	@echo "  $(BLUE)make status$(RESET)    - Full stack status (ps + images + volumes)"
	@echo "  $(BLUE)make shell$(RESET)     - Open shell inside API container"
	@echo "  $(BLUE)make db-shell$(RESET)  - Open psql inside DB container"
	@echo ""
	@echo "$(BOLD)$(YELLOW)Cleanup:$(RESET)"
	@echo "  $(RED)make clean$(RESET)     - Remove containers, volumes, local images"
	@echo "  $(RED)make fclean$(RESET)    - clean + prune"
	@echo "  $(RED)make prune$(RESET)     - Prune all Docker system (dangling + cache + networks)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)Dev (stubs):$(RESET)"
	@echo "  $(CYAN)make test$(RESET)      - Run tests (not configured yet)"
	@echo "  $(CYAN)make lint$(RESET)      - Run linter (not configured yet)"
	@echo "  $(CYAN)make format$(RESET)    - Run formatter (not configured yet)"
	@echo ""

# ============================================================
# Lifecycle
# ============================================================

build:
	@echo "$(BOLD)$(BLUE)Building images...$(RESET)"
	@$(COMPOSE) build

up:
	@echo "$(BOLD)$(BLUE)Starting services...$(RESET)"
	@$(COMPOSE) up -d
	@echo ""
	@echo "$(GREEN)✅ Services started!$(RESET)"
	@echo "   $(BOLD)API$(RESET)      : http://localhost:8000"
	@echo "   $(BOLD)Docs$(RESET)     : http://localhost:8000/docs"
	@echo "   $(BOLD)Frontend$(RESET) : http://localhost:5173"
	@echo ""

down:
	@echo "$(BOLD)$(YELLOW)Stopping services and removing volumes...$(RESET)"
	@$(COMPOSE) down -v
	@echo "$(GREEN)✅ Services stopped$(RESET)"

stop:
	@$(COMPOSE) stop
	@echo "$(GREEN)✅ Services stopped (volumes kept)$(RESET)"

restart: down up

# ============================================================
# Debug
# ============================================================

logs:
	@$(COMPOSE) logs -f

logs-api:
	@$(COMPOSE) logs -f $(API_SERVICE)

logs-db:
	@$(COMPOSE) logs -f $(DB_SERVICE)

ps:
	@$(COMPOSE) ps

status:
	@echo "$(BOLD)$(CYAN)=== Containers ===$(RESET)"
	@$(COMPOSE) ps
	@echo ""
	@echo "$(BOLD)$(CYAN)=== Images ===$(RESET)"
	@docker images | grep -i "$(NAME)\|REPOSITORY" || echo "  (no images)"
	@echo ""
	@echo "$(BOLD)$(CYAN)=== Volumes ===$(RESET)"
	@docker volume ls | grep -i "$(NAME)\|DRIVER" || echo "  (no volumes)"
	@echo ""
	@echo "$(BOLD)$(CYAN)=== Networks ===$(RESET)"
	@docker network ls | grep -i "$(NAME)\|DRIVER" || echo "  (no networks)"

shell:
	@echo "$(BOLD)$(BLUE)Opening shell in $(API_SERVICE)...$(RESET)"
	@$(COMPOSE) exec $(API_SERVICE) sh

db-shell:
	@echo "$(BOLD)$(BLUE)Opening psql in $(DB_SERVICE)...$(RESET)"
	@$(COMPOSE) exec $(DB_SERVICE) psql -U $${POSTGRES_USER:-user} -d $${POSTGRES_DB:-saas_db}

# ============================================================
# Cleanup
# ============================================================

clean:
	@echo "$(BOLD)$(RED)Removing containers, volumes and local images...$(RESET)"
	@$(COMPOSE) down -v --rmi local
	@echo "$(GREEN)✅ Containers, volumes and local images removed$(RESET)"

prune:
	@echo "$(BOLD)$(RED)Pruning Docker system...$(RESET)"
	@docker system prune -af --volumes
	@docker builder prune -af
	@echo "$(GREEN)✅ Docker system pruned$(RESET)"

fclean: clean prune
	@echo "$(GREEN)✅ Full cleanup done$(RESET)"

# ============================================================
# Dev (stubs)
# ============================================================

test:
	@echo "$(YELLOW)⚠️  Tests not configured yet$(RESET)"
	@echo "   TODO: setup pytest + add test commands"

lint:
	@echo "$(YELLOW)⚠️  Linter not configured yet$(RESET)"
	@echo "   TODO: setup ruff or flake8"

format:
	@echo "$(YELLOW)⚠️  Formatter not configured yet$(RESET)"
	@echo "   TODO: setup black or ruff format"
