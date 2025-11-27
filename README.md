# Zenta CMPC Service (Backend)

API REST para la gestión de libros de CMPC, desarrollada con **NestJS + TypeScript** y **PostgreSQL** mediante `sequelize-typescript`.

## Instalación y ejecución local

```bash
yarn install
```

Crea un archivo `.env` en la raíz con, por ejemplo:

```env
NODE_ENV=development
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=zenta_cmpc
PGSSLMODE=disable

JWT_SECRET=dev-secret
JWT_EXPIRES_IN=1d
```

Arranca el servidor en desarrollo:

```bash
yarn start:dev
```

- API base: `http://localhost:3000/api`  
- Swagger: `http://localhost:3000/api/docs`


