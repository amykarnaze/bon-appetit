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

  getIngredientCost(missingIngredientList, ingredientsData) {
    return missingIngredientList.reduce((sum, recipeIngredient) => {
      let targetIngredient = ingredientsData.find((ingredient) => {
        return ingredient.id === recipeIngredient.id;
      });
      if (targetIngredient) {
        sum +=
          recipeIngredient.quantity.amount *
          targetIngredient.estimatedCostInCents;
      }
      return sum;
    }, 0);
  }

  getIngredientsAsList(listOfIngredients, ingredientsData) {
    return listOfIngredients.map((recipeIngredient) => {
      const ingredientName = ingredientsData.find((ingredientFromKey) => {
        return ingredientFromKey.id === recipeIngredient.id;
      }).name;
      let quantity = recipeIngredient.quantity.amount % 1 === 0 ? recipeIngredient.quantity.amount : recipeIngredient.quantity.amount.toFixed(2);
      return `${quantity} ${recipeIngredient.quantity.unit} ${ingredientName}`;
    });
  }

  getInstructionsAsList() {
    return this.instructions.map((recipeInstruction) => {
      return `Step ${recipeInstruction.number}: ${recipeInstruction.instruction}`;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
