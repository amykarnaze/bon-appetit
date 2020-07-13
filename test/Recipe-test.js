/* eslint-disable */

const chai = require('chai');

const expect = chai.expect;
var Recipe = require('../src/Recipe');
const ingredientsData = require('../data/ingredients');

describe('Recipe', function () {
  let recipe;
  let recipeForSadPaths;
  beforeEach(function () {
    var recipeData = {
      id: 595736,
      image: 'test-src',
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 0.5,
            unit: 'tsp',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
          number: 1,
        },
        {
          instruction: 'Add egg and vanilla and mix until combined.',
          number: 2,
        },
      ],
      name: 'Loaded Chocolate Chip Pudding Cookie Cups',
      tags: [
        'antipasti',
        'starter',
        'snack',
        'appetizer',
        'antipasto',
        "hor d'oeuvre",
      ],
    };

    recipe = new Recipe(recipeData);
    recipeForSadPaths = new Recipe({});
  });

  it('should be a function', function () {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function () {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', function () {
    expect(recipe.id).to.equal(595736);
  });

  it('should have a default id of ', function () {
    expect(recipeForSadPaths.id).to.equal(999999);
  });

  it('should have an image src', function () {
    expect(recipe.image).to.deep.equal('test-src');
  });

  it('should have a default image', function () {
    expect(recipeForSadPaths.image).to.equal(
      'https://spoonacular.com/recipeImages/880108-556x370.jpg'
    );
  });

  it('should have ingredients', function () {
    var expectedIngredients = [
      {
        id: 20081,
        quantity: {
          amount: 1.5,
          unit: 'c',
        },
      },
      {
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: 'tsp',
        },
      },
    ];
    expect(recipe.ingredients).to.deep.equal(expectedIngredients);
  });

  it('should have no ingredients as default', function () {
    expect(recipeForSadPaths.ingredients).to.deep.equal([]);
  });

  it('should have instructions', function () {
    var expectedInstructions = [
      {
        instruction:
          'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        number: 1,
      },
      {
        instruction: 'Add egg and vanilla and mix until combined.',
        number: 2,
      },
    ];
    expect(recipe.instructions).to.deep.equal(expectedInstructions);
  });

  it('should have no instructions default', function () {
    expect(recipeForSadPaths.instructions).to.deep.equal([]);
  });

  it('should have a name', function () {
    expect(recipe.name).to.deep.equal(
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
  });

  it('should have a default name of Empty Recipe', function () {
    expect(recipeForSadPaths.name).to.equal('Empty Recipe');
  });

  it('should have a default tag', function () {
    var recipeData = {
      id: 595736,
      image: 'test-src',
      ingredients: [],
      instructions: [],
      name: 'Loaded Chocolate Chip Pudding Cookie Cups',
    };
    const recipeMissingTags = new Recipe(recipeData);
    expect(recipeMissingTags.tags).to.deep.equal([]);
  });

  it('should have tags', function () {
    var expectedTags = [
      'antipasti',
      'starter',
      'snack',
      'appetizer',
      'antipasto',
      "hor d'oeuvre",
    ];
    expect(recipe.tags).to.deep.equal(expectedTags);
  });

  describe('getIngredientCost', function () {
    it('should get cost of all ingredients', function () {
      const expectedCost = 142 * 1.5 + 582 * 0.5;
      const missingIngredientList = recipe.ingredients;
      expect(
        recipe.getIngredientCost(missingIngredientList, ingredientsData)
      ).to.equal(expectedCost);
    });

    it('should get cost of all ingredients with unknown ingredient id', function () {
      recipe.ingredients[0].id = '99999';
      const expectedCost = 582 * 0.5;
      const missingIngredientList = recipe.ingredients;
      expect(
        recipe.getIngredientCost(missingIngredientList, ingredientsData)
      ).to.equal(expectedCost);
    });
  });

  describe('getInstructionsAsList', function () {
    it('should return an array of the instructions numbered', function () {
      expect(recipe.getInstructionsAsList()).to.deep.equal([
        'Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        'Step 2: Add egg and vanilla and mix until combined.',
      ]);
    });
  });

  describe('getIngredientsAsList', function () {
    it('should return a list of the ingredients', function () {
      expect(
        recipe.getIngredientsAsList(recipe.ingredients, ingredientsData)
      ).to.deep.equal(['1.5c wheat flour', '0.5tsp bicarbonate of soda']);
    });
  });
});
