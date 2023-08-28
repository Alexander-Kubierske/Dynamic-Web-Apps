//@ts-check
import { reducer } from "./reducers.js";
import { AddNumber, SubtractNumber, ResetNumber } from "./actions.js";

/**
 * @typedef {object} State
 * @prop {number} count
 */

/**
 * @typedef {AddNumber | SubtractNumber | ResetNumber} Action
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

const states = [{ count: 0 }];

/**
 * @type {Array<Subscription>}
 */
let subscribers = [];

/**
 * @returns {State}
 */
export const getState = () => {
  return Object.freeze({ ...states[0] });
};

/**
 * @param {Action} action
 */
export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action); // count: 1
  console.log("next", next);

  subscribers.forEach((item) => item(prev, next));

  states.unshift(next);
};

/**
 *
 * @param {Subscription} Subscription
 * @returns {unsubscribe} a function to unsubscribe the calls
 */
export const Subscribe = (Subscription) => {
  subscribers.push(Subscription);
  const handler = (item) => item !== Subscription;

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(handler);
    subscribers = newSubscribers;
  };

  return unsubscribe;
};

/**
 * @typedef {object} Store
 * @prop {getState} getState
 * @prop {Subscribe} subscribe
 * @prop {dispatch} dispatch
 */
