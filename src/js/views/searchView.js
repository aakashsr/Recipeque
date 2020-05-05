import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchRecipeList.innerHTML = "";
};

const limitRecipeTitle = function (title, limit = 17) {
  const newTitle = [];
  if (title.length > 17) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length < limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  var markup = `
    <li>
      <a class="results__link results__link--active" href="#${
        recipe.recipe_id
      }">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt= ${recipe.title}>
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
    `;
  elements.searchRecipeList.insertAdjacentHTML("beforeEnd", markup);
};

export const renderResults = (recipes) => {
  recipes.forEach(function (recipe) {
    renderRecipe(recipe);
  });
};
