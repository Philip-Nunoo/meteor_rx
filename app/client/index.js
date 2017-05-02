/** client/index.js **/

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { App } from '/imports/ui/pages';

import 'semantic-ui-css/semantic.min.css';

Meteor.startup(() => (
  render(<App />, document.getElementById('app'))
));
