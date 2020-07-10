/* eslint-disable */
const chai = require('chai');

const expect = chai.expect;
var Pantry = require('../src/Pantry');
// var User = require('../src/User')

describe('Pantry', function () {
  let pantry;
  beforeEach(function () {
    pantry = new Pantry();
  });

  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function () {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a property of ingredients', function () {
    expect(pantry.ingredients).to.deep.equal([]);
  });
  describe('hasAllIngredients', function () {
    it('should tell me if it has the ingrediets in a given list of ingredients', function () {
      // need to build a function that  when given an array of ingredients checks them against its own ingredients and returns a boolean if it has them all

      // class Ingredient {
      //   constructor(ingredient) {
      //     this.id = ingredient.id;
      //     this.name = ingredient.name;
      //     this.estimatedCostInCents = ingredient.estimatedCostInCents;
      //   }
      // }

      const ingredientList1 = [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
      ];

      const mypantry = new Pantry([
        {
          amount: 4,
          ingredient: 20081,
        },
      ]);

      //have the panty with ingredients
      //create a list of ingredients1 that i know the pantry has
      expect(mypantry.hasAllIngredients(ingredientList1)).to.equal(true);
    });

    it.only('should tell me if it does not have the ingrediets in a given list of ingredients', function () {
      // need to build a function that  when given an array of ingredients checks them against its own ingredients and returns a boolean if it has them all

      // class Ingredient {
      //   constructor(ingredient) {
      //     this.id = ingredient.id;
      //     this.name = ingredient.name;
      //     this.estimatedCostInCents = ingredient.estimatedCostInCents;
      //   }
      // }

      const ingredientList1 = [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
      ];

      const mypantry = new Pantry([
        {
          amount: 4,
          ingredient: 20081,
        },
        {
          ingredient: 11297,
          amount: 4,
        },
      ]);

      //have the panty with ingredients
      //create a list of ingredients1 that i know the pantry has
      expect(mypantry.hasAllIngredients(ingredientList1)).to.equal(true);
    });
  });
});
