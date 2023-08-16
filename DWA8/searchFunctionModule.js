import { htmlSelector, books, BOOKS_PER_PAGE } from "./data.js";
import { showMoreButton, pageLoader } from "./view.js";

/** this variable holds the books which match
 * defined criteria. Initially it holds all the books to load the page.
 */
export let MATCHES = books;

/** This variable holds the 'page' we are on
 * with a page representing 36 book previews.
 */
export let PAGE = 0;

/**
 * This function toggles the search dialogue
 * resetting the form if the user cancels.
 *
 */
export const handleSearchToggle = () => {
  const searchToggle = htmlSelector.search.overlay;

  if (searchToggle.open) {
    searchToggle.open = false;
    htmlSelector.search.form.reset();
  } else {
    searchToggle.open = true;
    htmlSelector.search.title.focus();
  }
};

/**
 * This function handles the search form submit
 * changing all our variables to match the inputs
 * and then calls other functions to print results.
 *
 * @param {event} `submit`
 */
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const singleBook of books) {
    const titleMatch =
      filters.title.trim() === "" ||
      singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch =
      filters.author === "any" || singleBook.author === filters.author;

    let genreMatch = filters.genre === "any";

    for (const singleGenre of singleBook.genres) {
      if (filters.genre === `any`) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (titleMatch && authorMatch && genreMatch) result.push(singleBook);
  }

  if (result.length < 1) {
    htmlSelector.list.message.classList.add("list__message_show");
    htmlSelector.search.overlay.open = false;
  } else {
    htmlSelector.list.message.classList.remove("list__message_show");
  }

  MATCHES = result;
  PAGE = 0;
  htmlSelector.list.items.innerHTML = "";
  const extracted = MATCHES.slice(
    PAGE * BOOKS_PER_PAGE,
    (PAGE + 1) * BOOKS_PER_PAGE
  );
  pageLoader(extracted);
  showMoreButton();

  window.scrollTo({ top: 0, behavior: "smooth" });
  htmlSelector.search.overlay.open = false;
};

export const attachEventListenersSearch = () => {
  htmlSelector.search.header.addEventListener(`click`, handleSearchToggle);
  htmlSelector.search.cancel.addEventListener(`click`, handleSearchToggle);
  htmlSelector.search.form.addEventListener(`submit`, handleSearchSubmit);
};
