## Description

In this we use Prisma along with NestJS to implement a REST API. The controller that implements the routes of the API is calling a PrismaService which in turn uses Prisma Client to send queries to a database to fulfill the data needs of incoming requests.

## Installation

```bash
$ npm install
```

## Run Migrations

```bash
$ npx prisma migrate dev --name init
```

## Versions

`npm 10.4.0`
`node v20.11.0`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The project has to launch on 3000 port.
