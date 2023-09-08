/**
 * @typedef {object} TallyCounterState
 * @property {string} phase - The current phase of the application (e.g., "idle," "maxNum").
 * @property {object} data - Additional data related to the state.
 * @property {number} data.currentTally - The current count or tally.
 * @property {number} data.tallyMaximum - The maximum allowed value for the tally.
 * @property {number} data.tallyMinimum - The minimum allowed value for the tally.
 */

/**
 * Where the data for our app is stored. In this case it holds the current number in the tally.
 * @type {TallyCounterState}
 */
export const state = {
  phase: "idle",
  data: {
    currentTally: 0,
    tallyMaximum: 10,
    tallyMinimum: -10,
  },
};
