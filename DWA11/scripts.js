import { getState, dispatch, Subscribe } from "./model/store.js";
import { AddNumber, SubtractNumber, ResetNumber } from "./model/actions.js";

// Subscribe to state changes
const unsubscribe = Subscribe((next) => {
  console.log(`count: ${JSON.stringify(next)}`);
  console.log("------------------------");
});

// Perform actions
dispatch(AddNumber());
dispatch(AddNumber());
dispatch(SubtractNumber());
dispatch(ResetNumber());

// Unsubscribe after all actions are performed
unsubscribe();
