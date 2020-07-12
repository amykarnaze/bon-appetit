window.onload = setup();

function setup() {
  console.log('I got here');
  populateUserSelector();
  displayRecipeList(recipesData);
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

function displayRecipeList(recipes) {}
