import Search from "./models/Search";

const search = new Search("pizza");
console.log(search);

const state = {};

const controlSearch = async () => {
  // 1. get the query from the view
  const query = "pizza";

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

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
