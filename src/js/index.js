// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base'

/* Global State of the App
 * - Search Object
 * - Current Recepie Object
 * - Shopping List Object
 * - Liked Recepies
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (e) {
            clearLoader();
            alert('Error processing search. Contact Admin for API Usage!');
        }
    }
};

elements
    .searchForm
    .addEventListener('submit', e => {
        e.preventDefault();
        controlSearch();
    });

elements
    .searchResPages
    .addEventListener('click', e => {
        const btn = e
            .target
            .closest('.btn-inline');
        if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            searchView.clearResults();
            searchView.renderResults(state.search.result, goToPage);
        }
    });

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // 1) Get Id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2) New recipe object and add to state
         state.recipe = new Recipe(id);

        // 3) Prepare UI for results
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search) searchView.highlightSelected(id);
        
        try {
            // 4) Get Recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            
            // 5) Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
           
            // 6) Render results on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('98 Error processing recipe!');
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));