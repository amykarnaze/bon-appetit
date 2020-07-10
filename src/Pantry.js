/* eslint-disable */

class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
  }



  //compare actual recipe ingredients. recipe is an array of objects, with ingredients key being and 
  //array of objects w an id. 
  // const recipeData = [{
  //       "id": 595736,
  //       "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
  //       "ingredients": [{
  //             "id": 20081,
  //             "quantity": {
  //               "amount": 1.5,
  //               "unit": "c"
  //             }
  //           },
  // compare with users pantry which is an array of objects w 
  // key "pantry": [
  // {
  //   "amount": 4,
  //   "ingredient": 11477,
  // },
  // 
    findMissingIngredients(actualRecipe) {
      
      let pantryIngredientIds = this.userPantry.map(ingredientRecipe => ingredientRecipe.ingredient);
        // this.ingredients.ingredient.includes(ingredientRecipe.id)
    //when function is invoked, passing in actural recipe object
     let missingIngredients = actualRecipe.ingredients.filter(ingredient => {
       return !pantryIngredientIds.includes(ingredient.id);
     })
         console.log(missingIngredients)
        return missingIngredients;
        //same form as recipe.ingredients
// return the thing if it equates to soemthing truthy
}
}




if (typeof module !== 'undefined') {
    module.exports = Pantry;
}

