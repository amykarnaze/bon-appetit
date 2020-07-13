var currentInformation = {};

window.onload = setup();

function setup() {
  console.log('I got here');
  populateUserSelector();
  instantiateCurrentInfo();
  displayRecipeList(recipeData);
  displayOneRecipe(currentInformation.displayedRecipe);
}

function instantiateCurrentInfo() {
  changeCurrentUser(1);
  changeDisplayedRecipe(recipeData[0]);
  instantiateRecipeData();
}

function changeCurrentUser(id) {
  const userBasedOnID = usersData.find((user) => {
    return user.id === id;
  });
  currentInformation.currentUser = new User(
    userBasedOnID.name,
    userBasedOnID.id,
    userBasedOnID.pantry
  );
}

function changeDisplayedRecipe(recipe) {
  currentInformation.displayedRecipe = new Recipe(recipe);
}

function instantiateRecipeData() {
  currentInformation.allRecipes = recipeData.map((recipe) => {
    return new Recipe(recipe);
  });
}

function populateUserSelector() {
  const userSelector = document.querySelector('.user-selector');
  let userSelectorInnerHTML = '';
  usersData.forEach((user) => {
    userSelectorInnerHTML =
      userSelectorInnerHTML +
      `<option value="${user.name}" selected>${user.name}</option>
      `;
  });
  userSelector.innerHTML = userSelectorInnerHTML;
}

function displayRecipeList(recipes) {
  const recipeListSection = document.querySelector('.recipe-list');
  let recipeListInnerHTML = '';
  recipes.forEach((recipe) => {
    recipeListInnerHTML += `<li class="${recipe.id}">
            <img
              src="${recipe.image}"
              alt="Photo of ${recipe.name}"
            />
            <span class="recipe-link">${recipe.name}</span>
            <button class="favorite-button" alt="Add to Favorites">
              &#11088;
            </button>
          </li>`;
  });
  recipeListSection.innerHTML = recipeListInnerHTML;
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

//I know I need a function that takes in an array of strings
//The function needs to return a single string in HMTL format
// the format could be a paragraph or a ul 1st try paragraph
function listAsHTMLList(ingredientList) {
  return ingredientList.reduce((paragraph, ingredientNote) => {
    paragraph += `${ingredientNote} <br>`;
    return paragraph;
  }, '');
}

// I will reach for reduce to return a different data type
// at each iteration I will add to the accumulator which is a string
// may need a global recipe that is the displayedRecipe that we can change?
// may need another helper function that takes in recipe data and instatiates
// let displayedRecipe = new Recipe()
