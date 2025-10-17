PROJECT = myapp

up:
	docker compose up

down:
	docker compose down

down-v:
	docker compose down -v

build:
	docker compose build

ub:
	docker compose up --build

ps:
	docker compose ps

logs:
	docker compose logs -f

vub:
	docker compose down -v
	docker compose up --build

restart:
	docker compose down
	docker compose up -d

all:
	docker compose down
	docker compose down -v
	docker compose build
	docker compose up

prune:
	docker system prune -af
	docker volume prune -f
	docker network prune -f

images:
	docker images

containers:
	docker ps -a

clean:
	docker compose down -v --rmi all --remove-orphans

shell:
	docker exec -it $$(docker ps -q | head -n1) sh
	docker exec -it $$(docker ps -q | head -n1) bash
