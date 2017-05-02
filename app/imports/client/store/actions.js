/** imports/client/store/actions.js **/

import { createActions } from "rx_state";

export default createActions(["addTask$", "deleteTask$", "toggleCheck$"]);
