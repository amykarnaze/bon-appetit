var currentInformation = {};

window.onload = setup;

document
  .querySelector('.user-selector')
  .addEventListener('change', updateCurrentUser);

document.addEventListener('click', function delegate(event) {
  event.preventDefault();
  if (event.target.classList.contains('favorite-button')) {
    favoriteButtonClicked(event);
  } else if (event.target.classList.contains('recipe-identification')) {
    recipeImageClicked(event);
  } else if (event.target.classList.contains('favorite-recipes-tab')) {
    displayFavoriteRecipes();
  } else if (event.target.classList.contains('all-recipes-tab')) {
    displayRecipeList(currentInformation.allRecipes);
  } else if (event.target.classList.contains('find-button')) {
    displayFoundRecipes();
  } else if (event.target.classList.contains('cook-it')) {
    displayCookable();
  }
});

function setup() {
  populateUserSelector();
  instantiateCurrentInfo();
  displayRecipeList(recipeData);
  displayOneRecipe(currentInformation.displayedRecipe);
}

function populateUserSelector() {
  const userSelector = document.querySelector('.user-selector');
  let userSelectorInnerHTML = '';
  usersData.forEach((user) => {
    userSelectorInnerHTML =
      userSelectorInnerHTML +
      `<option value="${user.id}" selected>${user.name}</option>
      `;
  });
  userSelector.innerHTML = userSelectorInnerHTML;
}

function instantiateCurrentInfo() {
  instantiateUserData();
  changeCurrentUser(1);
  instantiateRecipeData();
  changeDisplayedRecipe(currentInformation.allRecipes[0]);
}

function instantiateUserData() {
  currentInformation.allUsers = usersData.map((user) => {
    return new User(user.name, user.id, new Pantry(user.pantry));
  });
}

function changeCurrentUser(id) {
  const userBasedOnID = currentInformation.allUsers.find((user) => {
    return user.id === id;
  });
  currentInformation.currentUser = userBasedOnID;
}

function instantiateRecipeData() {
  currentInformation.allRecipes = recipeData.map((recipe) => {
    return new Recipe(recipe);
  });
}

function changeDisplayedRecipe(recipe) {
  currentInformation.displayedRecipe = recipe;
}

function displayRecipeList(recipes) {
  const recipeListSection = document.querySelector('.recipe-list');
  let recipeListInnerHTML = '';
  recipes.forEach((recipe) => {
    recipeListInnerHTML += `<li class="${recipe.id}">
            <img class="recipe-identification ${recipe.id}"
              src="${recipe.image}"
              alt="Photo of ${recipe.name}"
            />
            <span class="recipe-link">${recipe.name}</span>
            <button class="favorite-button" alt="Add to Favorites" id="${recipe.id}">
              &#11088;
            </button>
          </li>`;
  });
  recipeListSection.innerHTML = recipeListInnerHTML;
  colorFavoriteButtons(recipes);
}

function displayOneRecipe(recipe) {
  const oneRecipeSection = document.querySelector(
    '.one-recipe-display-section'
  );
  let oneRecipeInnerHtml = `
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
        />
        <h2 class="one-recipe-title">
          ${recipe.name}
        </h2>
        <article class="one-recipe-ingredients">
          ${listAsHTMLList(
    recipe.getIngredientsAsList(recipe.ingredients, ingredientsData)
  )}
        </article>
        <button class="cook-it">Cook It!</button>
        <article class="one-recipe-instructions">
          ${listAsHTMLList(recipe.getInstructionsAsList())}
        </article>`;
  oneRecipeSection.innerHTML = oneRecipeInnerHtml;
}

function favoriteButtonClicked(event) {
  const button = document.getElementById(`${event.target.id}`);
  const clickedRecipeID = parseInt(event.target.id);
  const containsRecipe = currentInformation.currentUser.favoriteRecipes.includes(
    recipeFromID(clickedRecipeID)
  );
  if (containsRecipe) {
    currentInformation.currentUser.removeFavoriteRecipe(
      recipeFromID(clickedRecipeID)
    );
  } else {
    currentInformation.currentUser.addFavoriteRecipe(
      recipeFromID(clickedRecipeID)
    );
  }
  button.classList.toggle('favorited');
}

function recipeFromID(id) {
  return currentInformation.allRecipes.find((recipe) => {
    return recipe.id === id;
  });
}

function updateCurrentUser(event) {
  changeCurrentUser(parseInt(event.target.value));
  displayRecipeList(currentInformation.allRecipes);
  colorFavoriteButtons(currentInformation.allRecipes);
}

function colorFavoriteButtons(recipes) {
  recipes.forEach((recipe) => {
    const favoriteButton = document.getElementById(recipe.id);
    if (
      favoriteButton &&
      currentInformation.currentUser.favoriteRecipes.includes(recipe)
    ) {
      favoriteButton.classList.add('favorited');
    }
  });
}

function listAsHTMLList(ingredientList) {
  return ingredientList.reduce((paragraph, ingredientNote) => {
    paragraph += `${ingredientNote} <br>`;
    return paragraph;
  }, '');
}

function recipeImageClicked(event) {
  const recipeImageId = parseInt(event.target.classList[1]);
  const clickedRecipe = recipeFromID(recipeImageId);
  displayOneRecipe(clickedRecipe);
  changeDisplayedRecipe(clickedRecipe);
}

function displayFavoriteRecipes() {
  displayRecipeList(currentInformation.currentUser.favoriteRecipes);
}

function displayFoundRecipes() {
  const searchValue = document
    .querySelector('#recipe-search')
    .value.toLowerCase();
  const foundRecipes = currentInformation.currentUser.findRecipesByInput(
    searchValue,
    ingredientsData
  );
  displayRecipeList(foundRecipes);
}

function displayCookable() {
  if (
    currentInformation.currentUser.pantry.hasAllIngredients(
      currentInformation.displayedRecipe.ingredients
    )
  ) {
    alert(
      'You have all of the Ingredients in your pantry!! You are ready to cook'
    );
  } else {
    const missingIngredients = currentInformation.currentUser.pantry.findMissingIngredients(
      currentInformation.displayedRecipe
    );
    const missingCost = currentInformation.displayedRecipe.getIngredientCost(
      missingIngredients,
      ingredientsData
    );
    const missingIngredientsFormatted = listAsHTMLList(
      currentInformation.displayedRecipe.getIngredientsAsList(
        missingIngredients,
        ingredientsData
      )
    );
    const oneRecipeInstructions = document.querySelector(
      '.one-recipe-instructions'
    );
    oneRecipeInstructions.innerHTML = `Your Pantry is missing some ingredients for this recipe, <br>
      Here is a shopping list for you: <br>
      ${missingIngredientsFormatted}
      The total Cost is $${missingCost.toFixed(2)}`;
  }
}