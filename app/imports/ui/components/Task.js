/** imports/ui/components/Task.js **/

import React, { Component, PropTypes } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

// Task component - represents a single todo item
class Task extends Component {
  constructor(props) {
    super(props);

    this._deleteTask = this._deleteTask.bind(this);
    this._toggleChecked = this._toggleChecked.bind(this);
  }

  _deleteTask() {
    this.props.deleteTask(this.props.task._id);
  }

  _toggleChecked() {
    this.props.toggleCheck(this.props.task._id);
  }

  render() {
    const { task } = this.props;
    return (
      <li>
        <Checkbox
          checked
          checked={task.checked}
          onClick={this._toggleChecked}
          label={task.text}
          className={task.checked ? 'completed' : ''}
        />
        <a className="tiny right floated ui red image label" onClick={this._deleteTask}> Remove </a>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};

export default Task;
