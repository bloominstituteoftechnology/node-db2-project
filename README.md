# Web DB II Module Challenge

In this challenge, you will write an API that can be used to manage _Zoos_ stored in a Relational Database.

## Project Set Up

Follow these steps for starting your project.

- [ ] Fork this repository and **clone your fork**.
- [ ] Add your project manager as collaborator on your fork.
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your project manager as a reviewer on the pull-request
- [ ] Your project manager will count the project as complete by merging the branch back into master.

## Minimum Viable Product

- Configure `knex` to connect to the `/data/lambda.db3` database using the `sqlite3` npm module.
- Write a set of endpoints inside `index.js` to satisfy the specifications listed below. Feel free to extract the endpoints to it's own express Router.
- To start the API, type `npm run server`.
- Use a rest client like _Insomnia_ or _Postman_ to test your API.

## Specifications

The included database has a _zoos_ table with the following schema:

| Column | Data Type | Details                      |
| ------ | --------- | ---------------------------- |
| id     | integer   | primary key, auto-increments |
| name   | text      | required, unique             |

### `POST /api/zoos`

When the client makes a `POST` request to this endpoint, a new _zoo_ should be created in the _zoos_ table.

Ensure the client passes a `name` property in the request body. If there's an error, respond with an appropriate status code, and send a JSON response of the form `{ error: "Some useful error message" }`.

Return the inserted zoo and a 201 status code.

### `GET /api/zoos`

When the client makes a `GET` request to this endpoint, return a list of all the _zoos_ in the database. Remember to handle any errors and return the correct status code.

### `GET /api/zoos/:id`

When the client makes a `GET` request to `/api/zoos/:id`, find and return the _zoo_ associated with the given `id` or an HTTP status code `404` and a helpful message if no zoo with that `id` exists. Remember to handle errors and send the correct status code.

### DELETE /api/zoos/:id

When the client makes a `DELETE` request to this endpoint, the _zoo_ that has the provided `id` should be removed from the database.

### PUT /api/zoos/:id

When the client makes a `PUT` request to this endpoint passing an object with the changes, the _zoo_ with the provided `id` should be updated with the new information.

## Stretch Problem

Add a new _bears_ table to the database and add endpoints to perform CRUD operations on it. Each bear should have an `id` and `name` property similar to the _zoos_ table.
