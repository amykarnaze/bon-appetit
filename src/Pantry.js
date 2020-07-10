class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }
  hasAllIngredients(ingredientList1) {
    //return true or false
    // check each item in the ingredient list against the pantry
    // if the ingredients in the pantry has an ingredient, whose number matches the ingredient id
    // check to see if the panty ingredient amount is greater than or equal to the ingredient quantity
    // if all of the ingredients in the list are true for the above statement
    // return true
    //otherwise false
    return ingredientList1.every((ingredientNeeded) => {
      return (
        this.findIngredient(ingredientNeeded.id).amount >=
        ingredientNeeded.quantity.amount
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
