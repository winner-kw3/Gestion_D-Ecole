# Variables
FRONTEND_DOCKER=docker compose 
MYSQL_CONTAINER=mysql_db
MYSQL_INIT=mysql-init/init.sql

.PHONY: all build clean start stop restart db-init electron

all: build

build:
#cd frontend_ && npm install && npm run build
	cd frontend_lourd && npm install && npm run build

docker-up:
	$(FRONTEND_DOCKER) up -d

docker-down:
	$(FRONTEND_DOCKER) down

docker-restart:
	$(FRONTEND_DOCKER) restart

db-init:
	docker exec -i $(MYSQL_CONTAINER) mysql -u root -p_PASSWORD gestion_ecole < $(MYSQL_INIT)

electron:
	cd frontend_lourd && npx electron dist/main.js

start: build docker-up electron

clean:
	cd frontend_ && rm -rf node_modules dist
	cd frontend_lourd && rm -rf node_modules dist
