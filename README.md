# fastify-project-template

This template is a base to start your typescript fastify project. The base include:
* eslint/prettier
* prisma/schemix
* jest

## Project Setup

### Basic setup

1. Install packages
```sh
npm install
```
2. Create .env file
```sh
cp .env.example .env
```
3. Migrate database
```sh
prisma migrate dev --name init        # add --create-only if you don't want to auto apply the migration
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Directory structure

```
logs
|------ app.logs                       # Application logs
prisma
|------ seeders                        # Database seeders
|------ schema                         # Generated migration schema (DO NOT EDIT MANUALLY)
        |------ schema.prisma          # Base schema file
src
|------ controllers                    # Project controllers
|------ middleware                     # Project middleware
|------ routes                         # Routing
|------ services                       # Project services
|------ tests                          # Jest test cases
|------ app.ts                         # Setup fastify instance
|------ server.ts                      # Run project
.env.example                           # Template for .env
```