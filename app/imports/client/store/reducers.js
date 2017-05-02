/** imports/client/store/reducers.js **/

import { Random } from 'meteor/random';
import { Observable } from "rxjs";
import tasksActions from "./actions";

const initialState = [
  { _id: Random.id(), text: 'This is task 1', checked: false },
  { _id: Random.id(), text: 'This is task 2', checked: false },
  { _id: Random.id(), text: 'This is task 3', checked: false },
];

export default Observable.of(() => initialState)
  .merge(
    tasksActions.addTask$.map(payload => state => { state.push({_id: Random.id(), text: payload, checked: false }); return state; }),
    tasksActions.deleteTask$.map(payload => state => state.filter(({ _id }) => (_id !== payload))),
    tasksActions.toggleCheck$.map(payload => state => state.map((task) => {
      if (task._id === payload) {
        task.checked = !task.checked;
      }
      return task;
    })),
  );
