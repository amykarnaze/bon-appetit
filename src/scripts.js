window.onload = setup();

function setup() {
  console.log('I got here');
  populateUserSelector();
  displayRecipeList(recipeData);
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
  let oneRecipeInnerHtml = `<section class="one-recipe-display-section">
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
        />
        <h2 class="one-recipe-title">
          ${recipe.name}
        </h2>
        <article class="one-recipe-ingredients">
          ingredients
        </article>
        <button class="cook-it">Cook It!</button>
        <article class="one-recipe-instructions">
          instructions
        </article>
      </section>`;
}
