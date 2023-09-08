import { state } from "./state.js";

const increaseTally = () => {
  if (state.data.currentTally === state.data.tallyMaximum) {
    transition("maxNum");
    alert(`Tally cannot exceed ${state.data.tallyMaximum}`);
  } else {
    if (state.phase === "minNum") {
      transition("idle");
    }
    state.data.currentTally = state.data.currentTally + 1;
  }
};

const decreaseTally = () => {
  if (state.data.currentTally === state.data.tallyMinimum) {
    transition("minNum");
    alert(`Tally cannot exceed ${state.data.tallyMinimum}`);
  } else {
    if (state.phase === "maxNum") {
      transition("idle");
    }
    state.data.currentTally = state.data.currentTally - 1;
  }
};

const resetTally = () => {
  state.data.currentTally = 0;
  transition("idle");
};

const transition = (phase) => {
  state.phase = phase;
};

export const actions = {
  idle: {
    reset: resetTally, //
    increase: increaseTally,
    decrease: decreaseTally,
  },
  maxNum: {
    reset: resetTally, //
    decrease: decreaseTally,
  },
  minNum: {
    reset: resetTally, //
    increase: increaseTally,
  },
};

// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally();
// decreaseTally(); //-10
// console.log(state.phase); // idle
// decreaseTally(); //alert
// console.log(state.phase); // min num
// increaseTally(); //-9
// console.log(state.phase); // idle

// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally();
// increaseTally(); // 10
// console.log(state.phase); // idle
// increaseTally(); //alert
// console.log(state.phase); // maxnum
// decreaseTally(); // 9
// console.log(state.phase); // idle

// in theory we should have a state that moves to the increasing and decreasing phase however it seemed unnecessary hence the functions controlling the flow state.
