import { htmlSelector, CSS } from "./data.js";

/**
 * This function checks if the users browser or user has
 * a specific theme and sets our website to either dark or light theme
 *
 */
export const defaultTheme = () => {
  const themeEvaluation =
    htmlSelector.settings.theme.value === window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").MATCHES;
  const themeValues = themeEvaluation ? "night" : "day";

  document.documentElement.style.setProperty(
    "--color-dark",
    CSS[themeValues].dark
  );
  document.documentElement.style.setProperty(
    "--color-light",
    CSS[themeValues].light
  );
  CSS.current = themeValues;
};

/**
 * This function toggles the theme menu.
 *
 */
export const handleThemeToggle = () => {
  const current = htmlSelector.settings.overlay.open;

  if (current) {
    htmlSelector.settings.overlay.open = false;
    htmlSelector.settings.theme.value = CSS.current;
  } else {
    htmlSelector.settings.overlay.open = true;
  }
};

/**
 * This function changes the theme of our page
 * by interacting with the <html> style
 *
 * @param {event} `click`
 */
export const handleThemeSubmit = (event) => {
  event.preventDefault();
  const userTheme = htmlSelector.settings.theme.value;

  switch (userTheme) {
    case `day`:
      document.documentElement.style.setProperty(
        "--color-dark",
        CSS[userTheme].dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        CSS[userTheme].light
      );
      CSS.current = userTheme;
      break;
    case `night`:
      document.documentElement.style.setProperty(
        "--color-dark",
        CSS[userTheme].dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        CSS[userTheme].light
      );
      CSS.current = userTheme;
      break;
    default:
      defaultTheme();
      break;
  }

  htmlSelector.settings.overlay.open = false;
  htmlSelector.settings.theme.value = userTheme;
};

export const attachEventListenersTheme = () => {
  htmlSelector.settings.header.addEventListener("click", handleThemeToggle);
  htmlSelector.settings.cancel.addEventListener("click", handleThemeToggle);
  htmlSelector.settings.form.addEventListener("submit", handleThemeSubmit);
};
