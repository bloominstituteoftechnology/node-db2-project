# Node DB2 Project Starter Code

## Introduction

In this challenge, you will write an API that can be used to manage _Cars_ stored in a Relational Database.

## Instructions

### Task 1: Set Up The Project With Git

Follow these steps to set up and work on your project:

- [x] Create a forked copy of this project.
- [x] Clone your OWN version of the repository (Not Lambda's by mistake!).
- [x] Create a new branch: git checkout -b `<firstName-lastName>`.
- [x] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [x] Push commits: git push -u origin `<firstName-lastName>`.

### Task 2: Minimum Viable Product

- Using `knex migrations`, design and write a schema for the `cars` table using the specifications below.
- Configure `knex` to connect to a `/data/car-dealer.db3` database using the `sqlite3` npm module.
- Write endpoints to support `CREATE` and `READ` operations on the `cars` resource.
- Use a rest client like _Insomnia_ or _Postman_ to test your API.

## Specifications

The client for this API is a car dealer who has provided the following specs:

- The critical information for each car is the VIN, make, model, and mileage.
- They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.

### Task 3: Stretch Problems

- Add seed data to the database using `knex seeds`
- Add `UPDATE` and `DELETE` operations to your API.
- Write a schema file for a `sales` table. This table should track information on the sale of each car. You may wish to research `foreign keys` in order to link each sale to the entry in `cars` which sold.

## Submission format

Follow these steps for completing your project.

- [ ] Submit a pull request to merge <firstName-lastName> Branch into master (student's  Repo). **Please don't merge your own pull request**

