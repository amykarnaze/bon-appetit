// const usersData = require('../data/users.js');
// const ingredientsData = require('../data/ingredients');

// const usersData = require('../data/users');

// const recipesData = require('../data/recipes');
window.onload = setup();

function setup() {
  console.log('I got here');
  populateUserSelector();
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
