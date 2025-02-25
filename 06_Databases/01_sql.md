### SQL refresher
Every *CRUDdy* command in SQL contains a few parts 
- the action (“statement”), 
- the table it should run on, and 
- the conditions (“clauses”).

### CRUD Queries
1. INSERT STATEMENTS - `INSERT INTO users (name, email) VALUES ('foobar','foo@bar.com');`
2. DELETE STATEMENTS - `DELETE FROM users WHERE id > 12 AND name = 'foo';`
3. UPDATE STATEMENTS -  
    ```sql
    UPDATE users
    SET name='barfoo', email='bar@foo.com'
    WHERE email='foo@bar.com';
    ```
4. SELECT STATEMENTS - `SELECT users.id, users.name FROM users` or select distinct/unique rows without duplicates `SELECT DISTINCT users.name FROM users`.

### Aggregations and Joining tables
- MAX - `SELECT MAX(users.age) FROM user` or assign the aggregated column a new name `SELECT MAX(users.age) AS highest_age FROM users`
- JOIN,COUNT, and GROUP BY -
    ```sql
    SELECT users.id, users.name, COUNT(posts.id) AS posts_written
    FROM users
    JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.name;
    ```

If you want to only display a subset of your data. In a normal situation, you’d use a `WHERE` clause to narrow it down. But if 
you’ve used an aggregate function like `COUNT` (say to get the count of posts written for each user in the example above), `WHERE` 
won’t work anymore. So to conditionally retrieve records based on aggregate functions, you use the `HAVING` function, which is essentially the `WHERE` for aggregates. So say you only want to display users who have written more than 10 posts:
```sql
  SELECT users.id, users.name, COUNT(posts.id) AS posts_written
  FROM users
  JOIN posts ON users.id = posts.user_id
  GROUP BY users.id, users.name
  HAVING COUNT(posts.id) >= 10;
```

The tutorials in [simple SQL](https://www.sqlteaching.com/) also teach about inner joins, left joins, self joins, and using ***placeholders*** like 
-  the LIKE command in order to search through text-based values. With `LIKE`, there are two special characters: `%` and `_`. The percent sign (`%`) represents 
  zero, one, or multiple characters. The underscore (`_`) represents one character. For example, LIKE "SUPER _" would match values such as "SUPER 1", "SUPER A", 
  and "SUPER Z". LIKE "SUPER%" would match any value where SUPER is at the beginning, such as "SUPER CAT", "SUPER 123", or even "SUPER" by itself. 
  `SELECT * FROM robots WHERE name LIKE "%Robot%"`; would yield all values that contain "Robot" in the name. `LIKE` queries are not ***case sensitive***.

