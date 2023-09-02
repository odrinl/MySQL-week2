
![ERD Diagram](https://github.com/odrinl/MySQL-week2/blob/main/drawSQL-userdb.png) 

# Prep exercise week 2 and week 3
[- Week2](#week-2-exercise)

[- Week3](#week-3-exercise)

As a preparation step for the upcoming Q&A, you need to work on the following exercise, which is based on the prep exercise of the previous week.

## Week 2 Exercise

Last week you designed a database for storing food recipes. How can you improve your tables, based on what you learned this week?

- What changes do you need to make to include [these new recipes](recipes.md) in your database?

- Where can you add a primary key?
- Which tables should be linked with a foreign key?
- What type of relationships do you see between the tables?

- Can you make queries to get:
  - All the vegetarian recipes with potatoes
  - All the cakes that do not need baking
  - All the vegan and Japanese recipes

Since your table data might be different from the above questions, feel free to improvise.
Make sure that your database is running locally and that your queries are reproducable in .js files.

Having learned what an ERD is, how would you design one for the database you created? The diagram must visualize:

- Your entities
- Their attributes
- The relationships between the tables
  
## Week 3 Exercise

Last week you created an ERD for the database for storing food recipes. How can you normalize your database based on what you learned this week? In particular, try answering following questions and provide table definitions from the last week and this week to explain the changes.

Try to write answers to these questions in text, provide queries and commands when necessary.

**Q: Was your database already in 2NF / 3 NF?**

A: Yes.

**Q: What changes did you have to do to normalize your database?**

A: It's already normalized, but in general to normalize database we should:
1. Make it in 1NF (First Normal Form):

- Each table must have a primary key that uniquely identifies each row (no duplicate records).
- All columns must contain atomic (indivisible) values, meaning there should be no repeating groups, arrays, or lists of data within a column.

2. Make it in 2NF (Second Normal Form):

All non-key columns must be fully functionally dependent on the entire primary key. In other words, each non-key column should be dependent on the entire primary key, not just part of it.

3. Make it in 3NF (Third Normal Form):
There should be no transitive dependencies. In other words, non-key columns should not depend on other non-key columns.

**Q: If you want to add thousands of recipes to your database, what challenges do you foresee?**

A: I would take the following steps:
1. Backup the Database: Before making any significant changes, it's crucial to create a backup of your existing database to prevent data loss in case of unexpected issues. 

`mysqldump -u hyfuser -p userdb > backup.sql` 

2. Data Validation: Validate the data we're going to insert. Ensure that the data conforms to schema requirements and is free from errors. Cleanse the data as needed.

3. Indexing: Create appropriate indexes on columns that are frequently used in search and retrieval queries, as for example - RecipeName. Indexes can significantly improve query performance.

```sql
CREATE INDEX idx_RecipeName ON recipes (RecipeName); 
```

4. Transaction Management: Wrap data insertion process in transactions. This ensures that if an error occurs during insertion, the database remains in a consistent state.


```sql 
START TRANSACTION;

-- Insert recipes

COMMIT; 
```


5. Testing: Test data insertion process with a smaller dataset to identify and fix any issues before running it with thousands of recipes.

6. Error Handling: Implement robust error handling mechanisms to capture and log any errors that occur during data insertion.

7. Security: Ensure that security measures, including access controls and encryption, are in place to protect the database.




