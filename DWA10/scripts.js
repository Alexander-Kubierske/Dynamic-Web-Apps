const MAX_NUMBER = 1;
const MIN_NUMBER = -1;
const STEP_AMOUNT = 1;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector("[data-button-subtract]");
const add = document.querySelector("[data-button-add]");
const reset = document.querySelector("[data-button-reset]");
const alert = document.querySelector(".alert-closable");

alert.addEventListener("sl-after-show", () => {
  setTimeout(() => (alert.open = false), 5000);
});

const subtractHandler = () => {
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;
};

const addHandler = () => {
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;
};

const resetHandler = () => {
  const newValue = 0;
  number.value = newValue;
  alert.show();
};

subtract.addEventListener("click", subtractHandler);
add.addEventListener("click", addHandler);
reset.addEventListener("click", resetHandler);
