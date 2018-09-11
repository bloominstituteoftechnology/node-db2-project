# Building an API using a Relational Database Mini

Topics:

- Relational Databases
- SQLite
- Knex
- Create/Read/Update/Delete operations

## Description

You'll write a server that lets you create and read _Zoos_ stored in a Relational Database. Much of the knowledge from Node and Express will carry over to this mini project, where you'll interface with a database in your route handlers.

## Running the Project

- Fork and Clone this project.
- `cd` into your project folder.
- Run `npm install` or `yarn` to download the dependencies.
- Add `knex` and `sqlite3` npm modules.
- Configure `knex` to connect to `/data/lambda.sqlite3` using the `sqlite3` module.
- Write a set of endpionts inside `index.js` to satisfy the specifications listed below.
- To start the API server, run `yarn start` or `npm start`.
- Use _Postman_ to test your API.

## Specifications

### Table

The included database has a _zoos_ table with the following schema:

- id: integer, primary key, autoincrements.
- name: text, required, unique.

### `POST /api/zoos`

When the client makes a `POST` request to this endpoint, a new _zoo_ should be created in the _zoos_ table.

Ensure the client passes a `name` property in the request body. If there's an error, respond with an appropriate status code, and send a JSON response of the form `{ error: "Some useful error message" }`.

Return the `id` of the inserted zoo and a 201 status code.

### `GET /api/zoos`

When the client makes a `GET` request to this endpoint, return a list of all the _zoos_ in the database. Remember to handle any errors and return the correct status code.

### `GET /api/zoos/:id`

When the client makes a `GET` request to `/api/zoos/:id`, find the _zoo_ associated with the given `id`. Remember to handle errors and send the correct status code.

### DELETE /api/zoos/:id

When the client makes a `DELETE` request to this endpoint, the _zoo_ that has the provided `id` should be removed from the database.

### PUT /api/zoos/:id

When the client makes a `PUT` request to this endpoint passing an object with the changes, the _zoo_ with the provided `id` should be updated with the new information.

## Stretch Problem

Add a new _bears_ table to the database and add endpoints to perform CRUD operations on it. Each bear should have an `id` and `name` property similar to the _zoos_ table.
