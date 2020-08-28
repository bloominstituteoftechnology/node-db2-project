(notes from guided)

{14:30 Timestamp }

WHEN Desigining a Database Schema 
- what fields, or clumns, does a table need?
- what should the  identifying column be for that primary key?
- what type of data do we expect for each column?
- Are there any restrictions needed for each column? 

{ refer to the docs online } 

- SUPPOTRED DATA TYPES IN SQLITE 
Datatypes In SQLite
Most SQL database engines (every SQL database engine other than SQLite, as far as we know) uses static, rigid typing. With static typing, the datatype of a value is determined by its container - the particular column in which the value is stored.


- Storage Classes and Datatypes
Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes:

NULL. The value is a NULL value.

INTEGER. The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.

REAL. The value is a floating point value, stored as an 8-byte IEEE floating point number.

TEXT. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).

BLOB. The value is a blob of data, stored exactly as it was input.

<!-- THE (DDL) COMMANDS -->
<!-- Data Defintion language  --> screenshot on desktop 

<!-- timestamp building out a quiery database 36:48 --> 

- CREATING A DATA SCHEMA STEPS
e.g 
CREATE TABLE "table" (
    "ID" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT (because don't want the primary key to be empty ) (then I want the column to auto increment aever time a new row is impelmnted) 
)
- real example with written contraints 
CREATE TABLE IF NOT EXISTS "fruits" (
     "id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT, 
     "name" TEXT NOT NULL UNIQUE ,
     "avgWeightOz" FLOAT NOT NULL,
     "delicious" BOOLEAN DEFAULT true,
     "color" TEXT
);
<!--  -->
ALTER TABLE "fruits" 
ADD COLUMNS "tropcial" BOOLEN DEFAULT FALSE;
<!-- 1:25 timestamp -->
ALTER TABLE "fruits"  
ADD COLUMN "price" INTEGER NOT NULL DEFAULT 0;

<!-- Complety delete a table  -->
- use the drop table command 

DROP TABLE "table"


<!-- BETTER WAY OF DESGING IS CALLED DATABASE SCHEMA MIGRATION  -->

- Code written to a file that programmatically changes a database schema over time. Such as adding new tables, new columns, changing data types, etc..

{ steps } 
<!-- 1:08 -->
new folder 
   new file
migrations/1.js
    -Creates the fruits table

- KNEX comes with a migration libray 

npx knex migrate:make ( migration name) e.g fruist 
- this commands allows me to access the knex command line tool
- this will create an new migration file 


npx knex migrate:latest
 <!-- timestamp 1:26  -->


<!-- timestamp 1:30 -->
<!-- this will run the exports.down = function(knex) instead of the .up -->
npx knex migerate:rollback 


<!-- timestamp 1:32 -->
npx knex migrate:make fruit_color 
- make a new migration 

<!-- 1:42  --> batch migrations 

<!-- 1:43 --> batch run 2 migrations 

<!-- 1:45 --> npx knex migrate:down 
for all npx commands  
- knex --help 

<!-- 1:46 lastes again -->

MIGRATIONS ARE TIMEBASED!
<!-- 1:47 -->

- Whenever you run these migragtions it takes whatever files have not been run yet it batches them together.

<!-- 1:48 -->
 - Seeds - which is code that connects to the database and creates some test data when you run a command 

<!-- 1:50 - --> 
- npx seed:make fruits 
this will create a folder called seeds 

<!-- 1:51 -->
export.seed = async function(knex) {
    await knex(").insert 
    {},
    {},
    {},
    {},
    {},
 ])
}
<!-- 1:52 -->
npx knex seed: run
<!-- populate the table with some static test data -->

<!-- 1:55 --> 
important info 


<!-- 1:56  -->
answered question

<!-- 1:57 -->
- how the files all works connected

will return and write this down
to fully understand 