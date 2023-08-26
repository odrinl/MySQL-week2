const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb', 
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Query 1: All the vegetarian recipes with potatoes
connection.query(
  `SELECT RecipeName
  FROM Recipes AS r
  JOIN recipe_categories AS rc ON r.id = rc.RecipeID
  JOIN categories AS c ON rc.CategoryID = c.id
  JOIN recipe_ingredients AS ri ON r.id = ri.RecipeID
  JOIN ingredients AS i ON ri.IngredientID = i.id
  WHERE c.CategoryName = 'Vegetarian' AND i.IngredientName = 'Potatoes';
  `,
  (err, results) => {
    if (err) throw err;
    console.log('\n');
    console.log('All the vegetarian recipes with potatoes:');
    if (results.length === 0) {
      console.log('No recipes found.');
    } else {
      results.forEach((row) => {
        console.log(row.RecipeName);
      });
    }
    console.log('\n');
  }
);

// Query 2: All the cakes that do not need baking
connection.query(
  `SELECT r.RecipeName
  FROM recipes AS r
  JOIN recipe_categories AS rc ON r.id = rc.RecipeID
  JOIN categories AS c ON rc.CategoryID = c.id
  WHERE c.CategoryName IN ('Cake', 'No-Bake')
  GROUP BY r.id
  HAVING COUNT(DISTINCT c.CategoryName) = 2;`,
  (err, results) => {
    if (err) throw err;
    console.log('All the cakes that do not need baking:');
    if (results.length === 0) {
      console.log('No recipes found.');
    } else {
      results.forEach((row) => {
        console.log(row.RecipeName);
      });
    }
    console.log('\n');
  }
);

// Query 3: All the vegan and Japanese recipes
connection.query(
  `SELECT r.RecipeName
  FROM recipes AS r
  JOIN recipe_categories AS rc ON r.id = rc.RecipeID
  JOIN categories AS c ON rc.CategoryID = c.id
  WHERE c.CategoryName IN ('Vegan', 'Japanese')
  GROUP BY r.id
  HAVING COUNT(DISTINCT c.CategoryName) = 2;
  `,
  (err, results) => {
    if (err) throw err;
    console.log('All the vegan and Japanese recipes:');
    if (results.length === 0) {
      console.log('No recipes found.');
    } else {
      results.forEach((row) => {
        console.log(row.RecipeName);
      });
    }
    console.log('\n');
  }
);

// Close the database connection
connection.end((err) => {
  if (err) {
    console.error('Error closing the database connection: ' + err.stack);
    return;
  }
  console.log('Closed the database connection');
});

