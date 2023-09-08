import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { actions } from "./actions.js";
import { state } from "./state.js";

/**
 * The state in which the app can be.
 *
 * @typedef {"idle" | "maxNum" | "minNum" | "confirmReset"} phase
 */

class TallyCounter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #424250;
      padding: 16px;
      border-radius: 8px;
      text-align: center;
    }

    div {
      background-color: #33333d;
      color: #31c48d;
      font-weight: bold;
      width: 100%;
      padding: 8px 0;
      border-bottom: 1px solid #9ca3ae;
    }

    p {
      margin: 0;
    }

    button {
      background-color: #33333d;
      color: #ffffff;
      width: 100%;
      padding: 12px 0;
      border: 1px solid #9ca3ae;
      cursor: pointer;
      display: block;
      margin-bottom: 8px;
    }

    button:disabled {
      background-color: #ff5c5c;
      cursor: not-allowed;
    }

    button:hover {
      color: #31c48d;
    }
  `;

  static get properties() {
    return {
      currentTally: { type: Number }, // Define currentTally as a reactive property
    };
  }

  handleAction(actionName) {
    const actionsInCurrentState = actions[state.phase];
    const actionFunction = actionsInCurrentState[actionName];
    console.log(actionName);
    console.log(actionFunction);

    if (actionFunction) {
      // Call the action function, passing the current state or other data if needed
      actionFunction();
      this.requestTallyUpdate();
    } else {
      console.error(
        `Action '${actionName}' is not defined in the current state '${state.phase}'`
      );
    }
  }

  // this section allows us to update only the tally without having to bind our functions or nest them in this class.
  requestTallyUpdate() {
    this.requestUpdate("currentTally", null);
  }

  renderTally() {
    return html`<p>${state.data.currentTally}</p>`;
  }

  render() {
    return html`
      <div>
        <p>Current Tally:</p>
        <p>${state.data.currentTally}</p>
        <button @click="${() => this.handleAction("increase")}">
          Increase
        </button>
        <button @click="${() => this.handleAction("decrease")}">
          Decrease
        </button>
        <button @click="${() => this.handleAction("reset")}">Reset</button>
      </div>
    `;
  }
}

customElements.define("tally-app", TallyCounter);

// add disable to buttons
// change reset to confirmReset
// add transition state figure out the convention for when a state transitions.
