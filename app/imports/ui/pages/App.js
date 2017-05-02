/** imports/ui/pages/App.js **/

import { Random } from 'meteor/random';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Grid, Icon, Input } from 'semantic-ui-react';
import { Task } from '/imports/ui/components';

const tasks = [
  { _id: Random.id(), text: 'This is task 1', checked: false },
  { _id: Random.id(), text: 'This is task 2', checked: false },
  { _id: Random.id(), text: 'This is task 3', checked: false },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      tasks,
    };

    this._toggleHideCompleted = this._toggleHideCompleted.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._toggleCheck = this._toggleCheck.bind(this);
    this._deleteTask = this._deleteTask.bind(this);
  }

  _toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  _toggleCheck(payload) {
    const tasks = this.state.tasks.map((task) => {
      if (task._id === payload) {
        task.checked = !task.checked;
      }
      return task;
    });

    this.setState({ tasks });
  }

  _deleteTask(payload) {
    const tasks = this.state.tasks.filter(({ _id }) => (_id !== payload));

    this.setState({ tasks });
  }

  renderTasks() {
    let filteredTasks = this.state.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task, index) => (
      <Task
        key={index}
        task={task}
        toggleCheck={this._toggleCheck}
        deleteTask={this._deleteTask}
      />
    ));
  }

  _handleInputChange(e, { name, value }) { this.setState({ [name]: value }); }

  _handleSubmit(e) {
    e.preventDefault();
    const { text, tasks } = this.state;

    // Add new task to array
    tasks.push({_id: Random.id(), text, checked: false });
    // Clear form
    this.setState({ todoText: '' });
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column width={5}>
          <header>
            <h1>Todo List</h1>
            <label className="hide-completed">
              <Checkbox
                slider
                checked={this.state.hideCompleted}
                onClick={this._toggleHideCompleted}
                label="Hide Completed Tasks"
              />
            </label>

            <div className="add-block">
              <form className="new-task" onSubmit={this._handleSubmit}>
                <Input size="mini" action>
                  <Input
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this._handleInputChange}
                    placeholder="Type to add new tasks"
                  />
                  <Button
                    icon="plus"
                    color="teal"
                    type="submit"
                    labelPosition="right"
                    content="Add Task"
                  />
                </Input>
              </form>
            </div>
          </header>

          <ul>
            {this.renderTasks()}
          </ul>
        </Grid.Column>
      </Grid>
    );
  }
}


export default App;
