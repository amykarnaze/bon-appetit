/* eslint-disable */
const expect = require('chai').expect;
const usersData = require('../data/users.js');
const recipeData = require('../data/recipes.js');
const User = require('../src/User');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry');
describe('User', function () {
  let user1;
  let user2;
  let recipe1, recipe2, recipe3, recipe4;
  beforeEach(function () {
    user1 = new User(usersData[0].name, usersData[0].id, usersData[0].pantry);
    user2 = new User(usersData[1].name, usersData[1].id, usersData[1].pantry);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[3]);
    recipe4 = new Recipe(recipeData[5]);
  });
  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user2).to.be.an.instanceof(User);
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a unique id', function () {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it('should have a property of name', () => {
    expect(user1.name).to.equal("Saige O'Kon");
    expect(user2.name).to.equal('Ephraim Goyette');
  });

  it('should have a property of pantry', function () {
    expect(user1.pantry).to.be.an.instanceOf(Pantry);
  });

  it('should have a list of favoriteRecipes', function () {
    expect(user1.favoriteRecipes).to.deep.equal([]);
    expect(user2.favoriteRecipes).to.deep.equal([]);
  });

  it('should have a property of recipesToCook', function () {
    expect(user1.recipesToCook).to.deep.equal([]);
    expect(user2.recipesToCook).to.deep.equal([]);
  });

  describe('addFavoriteRecipe', function () {
    it('should be able to add favorite a recipe', () => {
      user1.addFavoriteRecipe(recipe1);
      expect(user1.favoriteRecipes).to.deep.equal([recipe1]);
    });
  });

  describe('removeFavoriteRecipe', function () {
    it('should be able to remove a favorite recipe', () => {
      user1.addFavoriteRecipe(recipe1);
      expect(user1.favoriteRecipes).to.deep.equal([recipe1]);
      user1.removeFavoriteRecipe(recipe1);
      expect(user1.favoriteRecipes).to.deep.equal([]);
    });
  });

  describe('addRecipesToCook', function () {
    it('should be able to add a recipe to recipesToCook', () => {
      user1.addRecipesToCook(recipe1);
      expect(user1.recipesToCook).to.deep.equal([recipe1]);
    });
  });

  describe('findRecipe', function () {
    it('should be able to find a recipe', function () {
      const recipes = [recipe1, recipe2];
      expect(user1.findRecipe(recipes, recipe2), recipe2);
    });
  });

  describe('findIndex', function () {
    it('should be able to find a recipe index', function () {
      const recipes = [recipe1, recipe2];
      expect(user1.findRecipeIndex(recipes, recipe2), 1);
    });
  });

  describe('removeRecipesToCook', function () {
    it('should be able to remove a recipe from recipesToCook', () => {
      user1.addRecipesToCook(recipe1);
      expect(user1.recipesToCook).to.deep.equal([recipe1]);
      user1.removeRecipesToCook(recipe1);
      expect(user1.recipesToCook).to.deep.equal([])
    });
  });

  describe('getSavedRecipes', function () {
    it('get saved recipes', function () {
      user1.addFavoriteRecipe(recipe1);
      user1.addRecipesToCook(recipe1);
      expect(user1.getSavedRecipes()).to.deep.equal([recipe1]);
    });
  });

  describe('findRecipesByType', function () {
    it('should be able to find a recipe by type', () => {
      const recipes = [recipe1, recipe2, recipe3, recipe4];
      recipes.forEach(recipe => {
        user1.addFavoriteRecipe(recipe);
      });
      expect(user1.findRecipesByType('side dish')).to.deep.equal([recipe3, recipe4]);
      expect(user1.findRecipesByType('starter')).to.deep.equal([recipe1]);
      expect(user1.findRecipesByType('cat')).to.deep.equal([]);
    });
  });

  describe('findRecipesByName', function () {
    it('should be able to find a recipe by name', () => {
      user1.addFavoriteRecipe(recipe1);
      user1.addFavoriteRecipe(recipe2);
      expect(user1.findRecipesByName('Loaded Chocolate Chip Pudding Cookie Cups')).to.deep.equal([recipe1]);
      expect(user1.findRecipesByName('Maple Dijon Apple Cider Grilled Pork Chops')).to.deep.equal([recipe2]);
      expect(user1.findRecipesByName('anything')).to.deep.equal([]);
    });
  });

  describe('findRecipesByIngredient', function () {
    it('should be able to find a recipe by ingredient', () => {
      user1.addFavoriteRecipe(recipe1);
      expect(user1.findRecipesByIngredient('eggs')).to.deep.equal([recipe1]);
    });
  });
});
