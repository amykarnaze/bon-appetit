/* eslint-disable */
// const ingredientsData = require('../data/ingredients');

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id || 999999;
    this.image =
      recipeData.image ||
      'https://spoonacular.com/recipeImages/880108-556x370.jpg';
    this.ingredients = recipeData.ingredients || [];
    this.instructions = recipeData.instructions || [];
    this.name = recipeData.name || 'Empty Recipe';
    this.tags = recipeData.tags || [];
  }

  // make sure the list of missing ingredients is passed in
  getIngredientCost(missingIngredientList, ingredientsData) {
    return missingIngredientList.reduce((sum, recipeIngredient) => {
      console.log(recipeIngredient);
      // console.log(ingredientsData);

      let targetIngredient = ingredientsData.find((ingredient) => {
        // console.log(ingredient);
        // console.log(ingredientsData);

        return ingredient.id === recipeIngredient.id;
      });
      // let ingredientAmount;
      if (targetIngredient) {
        sum +=
          recipeIngredient.quantity.amount *
          targetIngredient.estimatedCostInCents;
      }
      // console.log(sum)
      return sum;
    }, 0);
  }

  getIngredientsAsList(listOfIngredients, ingredientsData) {
    /* 
    I have an array of objects representing ingredients with key value pairs and an object quantity as one of the values as seen below
    [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 0.5,
            unit: 'tsp',
          },
        },
      ]
      I also have an array of objects representing a key for ingredients with and id that is a number and a name that is the string name of the ingredient
      I want to return an array of strings with equal length to the recipe ingredients
      I could use map to build that new array
      At each iteration I concat a string using the quantity.amount quantity .units and then need the matching name from the ingredients key
      I can get this with the find prototype
      returning the name property of the first instance where the ids match
      */
    return listOfIngredients.map((recipeIngredient) => {
      const ingredientName = ingredientsData.find((ingredientFromKey) => {
        return ingredientFromKey.id === recipeIngredient.id;
      }).name;

      return `${recipeIngredient.quantity.amount}${recipeIngredient.quantity.unit} ${ingredientName}`;
    });
  }

  getInstructionsAsList() {
    /* 
    I have an array of objects representing instructions with key value pairs of both instructions and the instruction number
    [
        {
          instruction:
            'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
          number: 1,
        },
        {
          instruction: 'Add egg and vanilla and mix until combined.',
          number: 2,
        },
      ]
      I want to return an array of strings with equal length to the recipe instructions
      I could use map to build that new array
      At each iteration I concat a string using the instruction and number properties of the current Object
      */
    return this.instructions.map((recipeInstruction) => {
      return `Step ${recipeInstruction.number}: ${recipeInstruction.instruction}`;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
