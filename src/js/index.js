import Search from "./models/Search";
import { elements } from "./views/base";
import * as searchView from "./views/searchView";

// const search = new Search(searchView.getInput());

const state = {};

const controlSearch = async () => {
  // 1. get the query from the view
  const query = searchView.getInput();

  //  if query exist
  if (query) {
    // 2. create a new search object with help of this query and save in state
    state.search = new Search(query);

    // 3. Prepared UI from results

    // 4. Make the search
    await state.search.getResults();

    // 5. console the results for now
    console.log(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
