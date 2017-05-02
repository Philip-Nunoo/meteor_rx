/** client/index.js **/

import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { RxStateProvider, createState } from "rx_state";
import { App } from "/imports/ui/pages";
import reducer$ from "/imports/client/store";

import "semantic-ui-css/semantic.min.css";

Meteor.startup(() => (
  render(
    <RxStateProvider state$={createState(reducer$)}>
      <App />
    </RxStateProvider>,
    document.getElementById('app')
  )
));
