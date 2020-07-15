const chai = require('chai');
const usersData = require('../data/users.js');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const Recipe = require('../src/Recipe');
const recipeData = require('../data/recipes.js');

describe('Pantry', function () {
  let pantry;
  let recipe;
  let pantryForSadPaths;
  beforeEach(function () {
    pantry = new Pantry(usersData[0].pantry);
    recipe = new Recipe(recipeData[0]);
    pantryForSadPaths = new Pantry();
  });

  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function () {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a property of userPantry', function () {
    expect(pantry.userPantry).to.deep.equal(usersData[0].pantry);
  });

  it('should have and empty pantry as a default', function () {
    expect(pantryForSadPaths.userPantry).to.deep.equal([]);
  });

  describe('hasAllIngredients', function () {
    let myPantry;
    beforeEach(function () {
      myPantry = new Pantry([
        {
          amount: 4,
          ingredient: 20081,
        },
        {
          ingredient: 11297,
          amount: 4,
        },
      ]);
    });

    it('should tell me if it has the ingredients in a given list of ingredients', function () {
      const ingredientList1 = [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
        {
          id: 11297,
          quantity: {
            amount: 1,
            unit: 'oz',
          },
        },
      ];

      expect(myPantry.hasAllIngredients(ingredientList1)).to.equal(true);
    });

    it('should tell me if it does not have the ingredients in a given list of ingredients', function () {
      const ingredientList1 = [
        {
          id: 259,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
        {
          id: 11297,
          quantity: {
            amount: 1,
            unit: 'oz',
          },
        },
      ];

      expect(myPantry.hasAllIngredients(ingredientList1)).to.equal(false);
    });

    it('should tell me if it does not have the right amount of ingredients in a given list of ingredients', function () {
      const ingredientList1 = [
        {
          id: 11297,
          quantity: {
            amount: 1,
            unit: 'oz',
          },
        },
        {
          id: 20081,
          quantity: {
            amount: 5,
            unit: 'c',
          },
        },
      ];

      expect(myPantry.hasAllIngredients(ingredientList1)).to.equal(false);
    });
  });

  describe('findMissingIngredients', function () {
    it('should find missing ingredients', () => {
      const missingIngredients = [
        {
          id: '1',
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
      ];
      recipe.ingredients = missingIngredients;
      expect(pantry.findMissingIngredients(recipe)).to.deep.equal(
        missingIngredients
      );
    });
  });
});
