/* eslint-disable */
const chai = require('chai');
const usersData = require('../data/users.js');
const expect = chai.expect;
var Pantry = require('../src/Pantry');
var Recipe = require('../src/Recipe');
const recipeData = require('../data/recipes.js');

// var User = require('../src/User')

describe('Pantry', function () {
  let pantry;
  let recipe;
  beforeEach(function() {
    // user = new Pantry();
    pantry = new Pantry(usersData[0].pantry);
    recipe = new Recipe(recipeData[0]);
  });

  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
});

it('should be an instance of User', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
});

it('should have a property of userPantry', function() {
    expect(pantry.userPantry).to.deep.equal(usersData[0].pantry);
  });

  describe('findMissingIngredients', function () {
    it('should find missing ingredients', () => {
    // pantry.findMissingIngredients(recipe);
    const missingIngredients = [{
      "id": "1",
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    }];
    recipe.ingredients = missingIngredients;
      expect(pantry.findMissingIngredients(recipe)).to.deep.equal(missingIngredients);
  })

  // todo write happy path for when ingredients are found
  })
});