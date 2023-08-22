import { htmlSelector, books, authors } from "./data.js";

/**
 * This function toggles our description dialogue from which the event occurred
 * and populates the description fields with the book information.
 *
 * @param {event} `click`
 */
export const handleDescriptionToggle = (event) => {
  if (htmlSelector.list.active.open) {
    htmlSelector.list.active.open = false;
  } else {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;
      const previewId = node?.dataset?.preview;

      for (const singleBook of books) {
        if (singleBook.id === previewId) active = singleBook;
      }
    }

    if (!active) return;
    htmlSelector.list.active.open = true;
    htmlSelector.list.blur.src = active.image;
    htmlSelector.list.image.src = active.image;
    htmlSelector.list.title.innerText = active.title;

    htmlSelector.list.subtitle.innerText = `${
      authors.data[active.author]
    } ${new Date(active.published).getFullYear()}`;
    htmlSelector.list.description.innerText = active.description;
  }
};

/**
 * Attaches event listeners to the elements responsible for toggling the description dialogue.
 * When the designated elements are clicked, the `handleDescriptionToggle` function will be called.
 */
export const attachEventListenersDescription = () => {
  htmlSelector.list.items.addEventListener("click", handleDescriptionToggle);
  htmlSelector.list.close.addEventListener("click", handleDescriptionToggle);
};
