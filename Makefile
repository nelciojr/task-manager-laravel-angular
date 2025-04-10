COMPOSE=docker compose

# Angular - Geração de páginas e serviços
ng-generate-service-auth:
	$(COMPOSE) exec frontend npx ng generate service services/auth

ng-generate-component-login:
	$(COMPOSE) exec frontend npx ng generate component pages/login

ng-generate-component-dashboard:
	$(COMPOSE) exec frontend npx ng generate component pages/dashboard

ng-generate-auth:
	$(MAKE) ng-generate-service-auth
	$(MAKE) ng-generate-component-login

# Subida e descida dos containers
up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

build:
	$(COMPOSE) build

build-no-cache:
	$(COMPOSE) build --no-cache

logs:
	$(COMPOSE) logs -f

# Backend
composer-install:
	$(COMPOSE) exec backend composer install

composer-require-jwt:
	$(COMPOSE) exec backend composer require tymon/jwt-auth
	$(COMPOSE) exec backend php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
	$(COMPOSE) exec backend php artisan jwt:secret


# Aguarda o banco de dados ficar pronto antes da migration
artisan-migrate:
	@echo "Aguardando o banco de dados ficar pronto..."
	$(COMPOSE) exec backend sh -c 'until mysqladmin ping -hmysql --silent; do echo "Aguardando MySQL..."; sleep 2; done'
	$(COMPOSE) exec backend php artisan migrate

fix-permissions:
	@echo "Ajustando permissões das pastas storage e bootstrap/cache..."
	$(COMPOSE) exec backend sh -c "chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache"

artisan-migrate-fresh-seed:
	$(COMPOSE) exec backend php artisan migrate:fresh --seed

artisan-seed:
	$(COMPOSE) exec backend php artisan db:seed

artisan-make-controller:
	$(COMPOSE) exec backend php artisan make:controller $(c)

artisan-make-model:
	$(COMPOSE) exec backend php artisan make:model $(m) -m -c

# Frontend
install-frontend:
	$(COMPOSE) exec frontend npm install

init: composer-install install-frontend composer-require-jwt fix-permissions artisan-migrate

full-setup: down build up init

reload:	down build up

reload-no-cache: down build-no-cache up