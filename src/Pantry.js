class Pantry {
  constructor(userPantry = []) {
    this.userPantry = userPantry;
  }

  findMissingIngredients(actualRecipe) {
    let pantryIngredientIds = this.userPantry.map(
      (ingredientRecipe) => ingredientRecipe.ingredient
    );
    let missingIngredients = actualRecipe.ingredients.filter((ingredient) => {
      return !pantryIngredientIds.includes(ingredient.id);
    });
    return missingIngredients;
  }

  hasAllIngredients(ingredientList) {
    return ingredientList.every((ingredientFromList) => {
      return (
        this.findIngredient(ingredientFromList.id) &&
        this.findIngredient(ingredientFromList.id).amount >=
          ingredientFromList.quantity.amount
      );
    });
  }

  findIngredient(ingredientID) {
    return this.userPantry.find((pantryIngredient) => {
      return pantryIngredient.ingredient === ingredientID;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
