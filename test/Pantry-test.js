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
  describe.only('hasAllIngredients', function () {
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
});
