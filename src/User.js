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
    const targetIndex = this.findRecipeIndex(
      this.favoriteRecipes,
      recipeToRemove
    );
    this.favoriteRecipes.splice(targetIndex, 1);
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
    const savedRecipesWithDuplicates = this.favoriteRecipes.concat(
      this.recipesToCook
    );
    const uniqueRecipes = new Set(savedRecipesWithDuplicates);
    return Array.from(uniqueRecipes);
  }
  findRecipesByType(tagName) {
    return this.getSavedRecipes().filter((recipe) => {
      return recipe.tags.join(' ').toLowerCase().includes(tagName.toLowerCase())
    });
  }

  findRecipesByName(name) {
    return this.getSavedRecipes().filter((recipe) => {
      return recipe.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  findRecipesByIngredient(ingredientName, ingredientsData) {
    let ingredientId;
    ingredientsData.forEach((ingredient) => {
      if (ingredientName.toLowerCase().includes(ingredient.name)) {
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

  findRecipesByInput(input, ingredientsData) {
    let ingredients = this.findRecipesByIngredient(input, ingredientsData);
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