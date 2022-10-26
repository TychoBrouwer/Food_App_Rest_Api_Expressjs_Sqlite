const db = require('../utils/recipes-db');
const sanitizeInput = require('../utils/sanitize-input');

function searchIngredientRecipe(data) {
  const {
    ingredients, limit,
  } = sanitizeInput(data);

  let query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes ON recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE 
  `;

  for (let i = 0; i < ingredients.length; i += 1) {
    query += 'ingredients.ingredient_name = ? ';

    if (i !== ingredients.length - 1) {
      query += 'OR ';
    }
  }

  query += ' LIMIT ?';

  let queryResult;

  try {
    queryResult = db.query(query, [...ingredients, limit]);

    if (!queryResult[0]) {
      return [];
    }
  } catch (err) {
    console.log(err);
  }

  return queryResult;
}

function searchRecipe(data) {
  const {
    name,
  } = sanitizeInput(data);

  const query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes ON recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE recipes.recipe_name = ?
  `;

  let queryResult;

  try {
    queryResult = db.query(query, [name]);

    if (!queryResult[0]) {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }

  return queryResult;
}

module.exports = {
  searchIngredientRecipe,
  searchRecipe,
};
