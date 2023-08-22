// This file handles the user interaction with the website using data from the data.js file

// +++++ Imports +++++
// import any variables or functions
import {
  BOOKS_PER_PAGE,
  authors,
  genres,
  books,
  htmlSelector,
} from "./data.js";
import { pageLoader, showMoreButton } from "./view.js";
import { attachEventListenersDescription } from "./descriptionFunctionModule.js";
import {
  defaultTheme,
  attachEventListenersTheme,
} from "./themeFunctionModule.js";
import {
  attachEventListenersSearch,
  MATCHES,
  PAGE,
} from "./searchFunctionModule.js";

// +++++ Validation +++++
// validate our imports
if (!books && !Array.isArray(books)) throw new Error("Source required");
if (!books && books.length < 2)
  throw new Error("Range must be an array with two numbers");

// +++++ Global Variables +++++
// used to declare any variables which the file might need

/** This variable holds the section of books which
 * need to be rendered or evaluated.
 */
const EXTRACTED = MATCHES.slice(
  PAGE * BOOKS_PER_PAGE,
  (PAGE + 1) * BOOKS_PER_PAGE
);

// +++++ Functions +++++
// holds our functions

/**
 * This function populates the options for the search function with either the genres or authors
 * and modifies the DOM elements that correspond to those categories
 *
 * @param {object} dataObject - object containing either author info or genre info
 * @param {string} dataObject.innerText - search option for everything in the category as a string
 * @param {string} dataObject.objectRepresentation - type of object being passed as a string
 * @param {object} dataObject.data - ID and name of authors or genres
 * @returns {void} - This function only modifies the DOM
 */
const createAllOptions = (dataObject) => {
  const { innerText, objectRepresentation, data } = dataObject;
  const optionsElement = document.createDocumentFragment();
  let element = document.createElement("option");
  element.value = "any";
  element.innerText = innerText; // this adds an option called all genres
  optionsElement.appendChild(element);

  for (const [id, name] of Object.entries(data)) {
    // another for loop choice that populates the select element options
    element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    optionsElement.appendChild(element);
  }

  htmlSelector.search[objectRepresentation].appendChild(optionsElement); // adds all options to the select element for each genre
};

/**
 * This function populates the page with the next 36/remaining
 * book previews.
 *
 */
const handleShowMore = () => {
  PAGE = PAGE + 1;
  const extracted = MATCHES.slice(
    PAGE * BOOKS_PER_PAGE,
    (PAGE + 1) * BOOKS_PER_PAGE
  );
  pageLoader(extracted);
  showMoreButton();
};

// +++++ Main Execution +++++
// loads the default page
pageLoader(EXTRACTED);
createAllOptions(authors);
createAllOptions(genres);
defaultTheme();
showMoreButton();

// +++++ Event Listeners +++++
// checks to see if the user interacts with the page
htmlSelector.list.button.addEventListener(`click`, handleShowMore);

attachEventListenersDescription();
attachEventListenersTheme();
attachEventListenersSearch();
