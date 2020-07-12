/* eslint-disable */
const Pantry = require('../src/Pantry');

const ingredientsData = require('../data/ingredients');

const userData = require('../data/users.js');
class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = new Pantry(pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavoriteRecipe(id) {
    if (!this.favoriteRecipes.includes(id)) {
      this.favoriteRecipes.push(id);
      //instantiate recipes w passed in data?
      // or 
      // whatever is passed into it needs to be an instantiated recipe

    }
    // issue # 23
  }

  removeFavoriteRecipe(recipeToRemove) {
    // let item = this.favoriteRecipes.indexOf(recipe.id);
    const targetIndex = this.favoriteRecipes.findIndex(recipe => {
      return recipe.id === recipeToRemove.id;
      // find index of recipe where ids match
    })
    this.favoriteRecipes.splice(targetIndex, 1);
    // #19
  }

  addRecipesToCook(recipeToAdd) {
    const recipeExists = this.findRecipe(this.recipesToCook, recipeToAdd);
    if (!recipeExists) {
      this.recipesToCook.push(recipeToAdd);
    }
  }

  findRecipe(recipes, recipeToFind) {
    return recipes.find(recipe => {
      return recipe.id === recipeToFind.id;
    });
  }

  removeRecipesToCook(recipeToRemove) {
    const targetIndex = this.recipesToCook.findIndex(recipe => {
      return recipe.id === recipeToRemove.id;
    });
    this.recipesToCook.splice(targetIndex, 1);
  }
  // #21
  getSavedRecipes() {
    // how to get unique values from an array
    const savedRecipesWithDuplicates = this.favoriteRecipes.concat(this.recipesToCook);
    console.log('recipes', savedRecipesWithDuplicates)
    console.log(new Set(savedRecipesWithDuplicates));
  }
  //search recipesToCook OR favoriteRecipes by type
  findRecipesByType(savedRecipes, tagName) {
    return savedRecipes.filter((recipe) => {
      return recipe.tags.includes(tagName);
    });
  }

  findRecipesByName(savedRecipes, name) {
    return savedRecipes.filter((recipe) => {
      return recipe.name.includes(name);
    });
  }

  // findRecipesByIngredient(savedRecipes, ingredientName) {
  //   let ingredientId;
  //   ingredientsData.forEach(ingredient => {
  //     if (ingredientName.includes(ingredient.name)) {
  //       ingredientId = ingredient.id;
  //     }
  //   })
  //     console.log(ingredientId);
  //     let matchedRecipes = [];
  //     savedRecipes.forEach(recipe => {
  //       recipe.ingredients.forEach(ingred => {
  //         if (ingred.id === ingredientId) {
  //           matchedRecipes.push(recipe);
  //         }
  //       })
  //     })
  //     // console.log(matchedRecipes)
  //     return matchedRecipes;
  //     // search savedRecipes for ingredients id
  //     }
  //     }
  findRecipesByIngredient(savedRecipes, ingredientName) {
    let ingredientId;
    ingredientsData.forEach((ingredient) => {
      if (ingredientName.includes(ingredient.name)) {
        ingredientId = ingredient.id;
      }
    });
    const matchedRecipes = savedRecipes.reduce((acc, recipe) => {
      recipe.ingredients.forEach((currentIngredient) => {
        if (currentIngredient.id === ingredientId) {
          acc.push(recipe);
        }
      });
      return acc;
    }, []);

    // console.log(matchedRecipes)
    return matchedRecipes;
  }

  // do search last
  // function name that takes in the same parameters
  // invoke each method
  //
}

// search recipesToCook by name OR ingredient
// ingredients in data only have id
// recipesToCook and favorites contain
// ingredients in pantry
// ingredients in recipe
// ingredients class

// user.pantry.ingredients

// A User should be able to determine whether they have sufficient ingredients in their pantry to cook a recipe
// if they DO NOT: see pantry stories
// return a list of ingredients they need to buy and how much it will cost
// (note - User should be able to do this for at least one recipe)
// push into recipesToCook array


// MAKE SINGLE SEARCH METHOD(uses a combination of )
// findRecipeByName, findRecipeByType, findRecipeByIngredient
// Needs to not have duplicates
// if that is possible in the list
// Used when user presses button after the search field is filled(make a check at some point that the field needs something)
// That list needs to be sent to a display
// function so the list changes
// Make defaults
// for all of the properties


if (typeof module !== 'undefined') {
  module.exports = User;
}
