// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

const storedErrorMessages = {
  "missing input":
    "Division not performed. Both values are required in inputs. Try again",
  "invalid number provided":
    "Division not performed. Invalid number provided. Try again",
  NaN: "Something critical went wrong. Please reload the page",
};

const createErrorMessage = (errorType) => {
  const errorMessageElement = document.getElementById("error-message");
  if (errorMessageElement) {
    console.log("exists");
    errorMessageElement.textContent = storedErrorMessages[errorType];
  } else {
    console.log("doesnt");
    const errorElementCreator = document.createElement("div");
    errorElementCreator.setAttribute("id", "error-message");
    errorElementCreator.textContent = storedErrorMessages[errorType];
    document.body.appendChild(errorElementCreator);
  }
};

const criticalError = () => {
  document.body.innerHTML = `<p> ${storedErrorMessages.NaN}</p>`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  try {
    if (isNaN(dividend) || isNaN(divider)) throw new Error("NaN");
    if (dividend === "" || divider === "") throw new Error("missing input");
    if (dividend <= 0 || divider <= 0)
      throw new Error("invalid number provided");

    result.innerText = Math.floor(dividend / divider);
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) errorMessageElement.textContent = "";
  } catch (error) {
    if (error.message === "NaN") {
      criticalError();
      console.error("Critical error occurred. Please reload the page.");
      console.trace();
    } else {
      createErrorMessage(error.message);
      console.error(error);
    }
  }
});
