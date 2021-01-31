# Node DB2 Project Starter Code

## Migrations Knex Command
npx knex migrate:make fruits-schema

# Migrate/restore a new Database Version command
Use this after a new schema change has been made with migrate:mkae schema to refesh it

npx knex migrate:latest


# Rollback
npx knex migrate:rollback
To use do 
    [1] npx knex migrate:rollback
    [2] npx knex migrate:latest
This will give you a fresh database allowing you to purge the db

    [1] - If you have problems with rollback: 
            Delete the database .db3 and then do
            1] - npx knex migrate:latest
            2] - npx knex migrate:rollback
            3] - npx knex migrate:latest


For each time you use rollback the last schema change is taken away. You can keep rolling back to start but one migrate:latest will bring you back to the current updated version


# Seed
npx knex seed:make 01-fruits
npx knex seed:run
This creates the new database with columns from each seperate migrations action command
This will ensure each new migration with the latest fresh database will have this data within it. It is good for production. Seed is the data for the database and migration is the schema to program the database. This makes version writing and vaildating much easier. 

## Introduction

In this challenge, you will write an API that can be used to manage _Cars_ stored in a Relational Database.

## Instructions

### Task 1: Set Up The Project With Git

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Clone your OWN version of the repository (Not Lambda's by mistake!).
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [ ] Push commits: git push -u origin `<firstName-lastName>`.

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

