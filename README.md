# USER CRUD WITH CLEAN ARCHITECTURE API

A simple user crud application built with TDD, Clean Architecture and Docker using typescript and nodejs.

This application contains authentication with JWT and forgot password implementations using nodemailer to delivery email messages. 
To access database layer it was used TypeORM with postgres.

## Install Project

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run dev` command

## Tests

- Run `npm run test` to run all tests
- Run `npm run test:unit` to run all unit tests
- Run `npm run test:integration` to run all integration tests
