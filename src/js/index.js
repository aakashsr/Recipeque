import Search from "./models/Search";
import Recipe from './models/Recipe';
import {
  elements,
  renderLoader,
  clearLoader
} from "./views/base";
import * as searchView from "./views/searchView";

// const search = new Search(searchView.getInput());

const state = {};

/*** 
 * SEARCH CONTROLLER
 ***/

const controlSearch = async () => {
  // 1. get the query from the view
  const query = searchView.getInput();

  //  if query exist
  if (query) {
    // 2. create a new search object with help of this query and save in state
    state.search = new Search(query);
    console.log(state);

    // 3. Prepared UI for results
    searchView.clearInput();
    searchView.clearResults();

    // 4. rendered the loader
    renderLoader(elements.searchRes);

    // 5. Make the search
    await state.search.getResults();

    // 6. Clear the loader
    clearLoader();

    // 6. render the results
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/*** 
RECIPE CONTROLLER
 ***/

const r = new Recipe(47746);
r.getRecipe();
console.log(r);