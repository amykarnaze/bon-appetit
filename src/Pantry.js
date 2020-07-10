class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
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
    return this.ingredients.find((pantryIngredient) => {
      return pantryIngredient.ingredient === ingredientID;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
