/* eslint-disable */
// const Pantry = require('../src/Pantry');
const ingredientsData = require('../data/ingredients');
const userData = require('../data/users.js');
class User {
  constructor(name, id, pantry) {
    this.name = name || 'friend';
    this.id = id || Math.ceil(Date.now());
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavoriteRecipe(recipeToAdd) {
    const recipeExists = this.findRecipe(this.favoriteRecipes, recipeToAdd);
    if (!recipeExists) {
      this.favoriteRecipes.push(recipeToAdd);
    }
  }

  addRecipesToCook(recipeToAdd) {
    const recipeExists = this.findRecipe(this.recipesToCook, recipeToAdd);
    if (!recipeExists) {
      this.recipesToCook.push(recipeToAdd);
    }
  }

  removeFavoriteRecipe(recipeToRemove) {
    // let item = this.favoriteRecipes.indexOf(recipe.id);
    const targetIndex = this.findRecipeIndex(
      this.favoriteRecipes,
      recipeToRemove
    );
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
    return recipes.find((recipe) => {
      return recipe.id === recipeToFind.id;
    });
  }

  findRecipeIndex(recipes, recipeToFind) {
    return recipes.findIndex((recipe) => {
      return recipe.id === recipeToFind.id;
    });
  }

  removeRecipesToCook(recipeToRemove) {
    const targetIndex = this.findRecipeIndex(
      this.recipesToCook,
      recipeToRemove
    );
    this.recipesToCook.splice(targetIndex, 1);
  }

  getSavedRecipes() {
    // how to get unique values from an array
    const savedRecipesWithDuplicates = this.favoriteRecipes.concat(
      this.recipesToCook
    );
    const uniqueRecipes = new Set(savedRecipesWithDuplicates);
    //need to get array from set
    return Array.from(uniqueRecipes);
  }
  //search recipesToCook OR favoriteRecipes by type
  findRecipesByType(tagName) {
    return this.getSavedRecipes().filter((recipe) => {
      return recipe.tags.includes(tagName);
    });
  }

  findRecipesByName(name) {
    return this.getSavedRecipes().filter((recipe) => {
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
  findRecipesByIngredient(ingredientName) {
    let ingredientId;
    ingredientsData.forEach((ingredient) => {
      if (ingredientName.includes(ingredient.name)) {
        ingredientId = ingredient.id;
      }
    });
    const matchedRecipes = this.getSavedRecipes().reduce((acc, recipe) => {
      recipe.ingredients.forEach((currentIngredient) => {
        if (currentIngredient.id === ingredientId) {
          acc.push(recipe);
        }
      });
      return acc;
    }, []);
    return matchedRecipes;
  }

  findRecipesByInput(input) {
    let ingredients = this.findRecipesByIngredient(input);
    let name = this.findRecipesByName(input);
    let tag = this.findRecipesByType(input);
    let totalSearch = ingredients.concat(name, tag);
    let uniqueInput = new Set(totalSearch);
    return Array.from(uniqueInput);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
