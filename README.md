# Node DB2 Project Starter Code

In this challenge, you will write an API that can be used to manage _Cars_ stored in a Relational Database.

### Task 1: Project Setup

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.

### Task 2a: MVP

- Using `knex migrations`, design and write a schema for the `cars` table using the specifications below.
- Configure `knex` to connect to a `/data/car-dealer.db3` database using the `sqlite3` npm module.
- Write endpoints to support `CREATE` and `READ` operations on the `cars` resource.
- Use a rest client like _Insomnia_ or _Postman_ to test your API.

## Specifications

The client for this API is a car dealer who has provided the following specs:

- The critical information for each car is the VIN, make, model, and mileage.
- They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.

### Task 2b: Exit Ticket

Once you begin, you will have 15 minutes to answer the questions [here](https://app.codesignal.com/public-test/iKFmA8AEqKdTjeK8j/gqLkuwLFDHAdrH).

The completion of these questions is mandatory for MVP. However, passing the quiz doesn't affect your standing as a Lambda School student whatsoever. This is Lambda School testing itself! Please answer honestly and to the best of your ability without using external references.

### Task 3: Stretch Problems

- Add seed data to the database using `knex seeds`
- Add `UPDATE` and `DELETE` operations to your API.
- Write a schema file for a `sales` table. This table should track information on the sale of each car. You may wish to research `foreign keys` in order to link each sale to the entry in `cars` which sold.

## Submission Format
* [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's  Repo). **Please don't merge your own pull request**
* [ ] Fill out your module retrospective form [here](https://forms.lambdaschool.com/module-retrospective) with a link to your PR



