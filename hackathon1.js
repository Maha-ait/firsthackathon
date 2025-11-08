const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',   // replace with your MySQL username
  password: 'your_mysql_password', // replace with your MySQL password
  database: 'hack1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Define ingredients and recipes
const ingredients = [
  'Milk', 'Bread', 'Spinach', 'Cheese', 'Tomato', 
  'Rice', 'Pasta', 'Noodles', 'Chicken'
];

const recipes = {
  'Milk': [
    'Creamy Broccoli Soup', 'Milk Pudding', 'Masala Chai', 'Milk Cake (Kalakand)', 'Creamy Pasta Sauce'
  ],
  'Bread': [
    'Bread Upma', 'Bread Pizza', 'French Toast', 'Garlic Bread', 'Bread Pakora'
  ],
  'Spinach': [
    'Palak Paneer', 'Spinach Paratha', 'Spinach Pasta', 'Spinach Rice', 'Spinach Omelette'
  ],
  'Cheese': [
    'Cheese Sandwich', 'Cheese Pasta', 'Cheese Balls', 'Cheese Paratha', 'Cheese Omelette'
  ],
  'Tomato': [
    'Tomato Soup', 'Tomato Rice', 'Tomato Chutney', 'Tomato Pasta', 'Tomato Omelette'
  ],
  'Rice': [
    'Fried Rice', 'Jeera Rice', 'Lemon Rice', 'Curd Rice', 'Vegetable Pulao'
  ],
  'Pasta': [
    'White Sauce Pasta', 'Red Sauce Pasta', 'Pasta Salad', 'Mac and Cheese', 'Pasta Bake'
  ],
  'Noodles': [
    'Veg Noodles', 'Chili Garlic Noodles', 'Hakka Noodles', 'Egg Noodles', 'Paneer Noodles'
  ],
  'Chicken': [
    'Chicken Curry', 'Grilled Chicken', 'Butter Chicken', 'Chicken Biryani', 'Chicken Fry'
  ]
};

// Function to add ingredient
async function addIngredient(id, name) {
  await pool.query('CALL AddIngredient(?, ?)', [id, name]);
  console.log(`Ingredient added: ${name}`);
}

// Function to add recipe
async function addRecipe(id, recipeName, ingredientName) {
  await pool.query('CALL AddRecipe(?, ?, ?)', [id, recipeName, ingredientName]);
  console.log(`Recipe added: ${recipeName} (Ingredient: ${ingredientName})`);
}

// Main function to insert all data
(async () => {
  try {
    let ingredientId = 1;
    let recipeId = 1;

    // Add all ingredients
    for (const ing of ingredients) {
      await addIngredient(ingredientId, ing);
      ingredientId++;
    }

    // Add all recipes
    for (const ing of ingredients) {
      const recList = recipes[ing];
      for (const rec of recList) {
        await addRecipe(recipeId, rec, ing);
        recipeId++;
      }
    }

    console.log('All ingredients and recipes added successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
})();
