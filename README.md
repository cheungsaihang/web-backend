# web-backend

## Description

[Nest](https://github.com/nestjs/nest) framework Prisma starter repository.

## Database preparation with Docker

```bash
# download mongodb image
$ docker pull mongodb/mongodb-atlas-local

# create and startup mongodb container 
$ docker compose -f docker-compose.yaml up -d
```

## Start / Stop database docker container

```bash
# stop mongodb container 
$ docker compose -f docker-compose.yaml stop

# start mongodb container if has not started yet
$ docker compose -f docker-compose.yaml start
```

## Installation
```bash
#install nestjs and other packages
$ npm install

#setup database schema
$ npx prisma db push
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

