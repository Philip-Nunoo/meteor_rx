/** imports/client/store/index.js **/

import { Observable } from "rxjs";
import TaskReducer$ from './reducers';

// combine reducers
export default Observable.merge(
  TaskReducer$.map(reducer => ["tasks", reducer]),
);
