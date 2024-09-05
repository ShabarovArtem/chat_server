# Test task for BestApp

## Установка

```
git clone https://github.com/ShabarovArtem/chat_server.git
cd chat_server
npm install
```

## Запуск

### Ручной

Настройки БД и прочее находятся в .env

```
npm run start:dev
```
Выполнение миграций 

```
npm run migrate:dev
```

### docker-compose

```
docker-compose up -d
```
Выполнение миграций

```
docker-compose exec api npx sequelize-cli db:migrate
```
