/**
 * An action creator function that returns and object with the "ADD" action.
 * @returns {object} an action object with type "ADD".
 */
const AddNumber = () => ({ type: "ADD" });

/**
 *  An action creator function that returns and object with the "SUBTRACT" action.
 * @returns {object} an action object with type "SUBTRACT".
 */
const SubtractNumber = () => ({ type: "SUBTRACT" });

/**
 *  An action creator function that returns and object with the "RESET" action.
 * @returns {object} an action object with type "RESET".
 */
const ResetNumber = () => ({ type: "RESET" });

export { AddNumber, SubtractNumber, ResetNumber };
