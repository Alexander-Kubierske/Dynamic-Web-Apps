import { authors, htmlSelector, BOOKS_PER_PAGE } from "./data.js";
import { MATCHES, PAGE } from "./searchFunctionModule.js";
import BookPreview from "./bc-preview.js";

// /**
//  * This function creates the html element that displays the basic information of a book
//  * as a button and returns that element.
//  *
//  * @param {string} author - author of the book as an id string
//  * @param {string} id - the id of the book as an id string
//  * @param {string} image - the cover image as a link string
//  * @param {string} title - the title of the book as a string
//  * @returns {HTMLElement} - the button element
//  */
// const createPreview = ({ author, id, image, title }) => {
//   const element = document.createElement("button");
//   element.classList = "preview";
//   element.setAttribute("data-preview", id);

//   element.innerHTML = /* html */ `
//           <img
//               class="preview__image"
//               src="${image}"
//           />

//           <div class="preview__info">
//               <h3 class="preview__title">${title}</h3>
//               <div class="preview__author">${authors.data[author]}</div>
//           </div>
//       `;
//   return element;
// };

/**
 * This is a caller function that calls createPreview
 * with the amount of books calculated by the EXTRACTED variable
 * and appends the returned elements to our DOM
 *
 * @param {Array} EXTRACTED - An array of objects representing items to load.
 * @param {string} EXTRACTED.author - The author of the item.
 * @param {string} EXTRACTED.image - The image URL for the item.
 * @param {string} EXTRACTED.title - The title of the item.
 * @param {string} EXTRACTED.id - The unique identifier of the item.
 * @returns {void} - This function only modifies the DOM
 */
export const pageLoader = (EXTRACTED) => {
  const fragment = document.createDocumentFragment();

  for (const { author, image, title, id } of EXTRACTED) {
    const bookPreview = document.createElement("book-preview");

    const previewSlicedBook = JSON.stringify({
      author,
      id,
      image,
      title,
    });
    bookPreview.setAttribute("book", previewSlicedBook);
    console.log(bookPreview);
    fragment.appendChild(bookPreview);
  }

  htmlSelector.list.items.appendChild(fragment);
};

/**
 * This function toggles the show more button if there are no more books
 * and populates it with the amount of books left to show as a number)
 *
 */
export const showMoreButton = () => {
  const moreButton = htmlSelector.list.button;
  const remainingMatches = MATCHES.length - (PAGE + 1) * BOOKS_PER_PAGE;
  moreButton.disabled = remainingMatches <= 0;
  const buttonTurnery = remainingMatches > 0 ? remainingMatches : 0;

  moreButton.innerHTML = /* html */ `
          <span>Show more</span>
          <span class="list__remaining"> (${buttonTurnery})</span>
  `;
};
