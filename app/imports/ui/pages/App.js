/** imports/ui/pages/App.js **/

import { Random } from "meteor/random";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Checkbox, Grid, Icon, Input } from "semantic-ui-react";
import { connect } from "rx_state";
import { Task } from "/imports/ui/components";
import actions from "/imports/client/store/actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };

    this._toggleHideCompleted = this._toggleHideCompleted.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task, index) => (
      <Task
        key={index}
        task={task}
        toggleCheck={this.props.toggleCheck}
        deleteTask={this.props.deleteTask}
      />
    ));
  }

  _handleInputChange(e, { name, value }) { this.setState({ [name]: value }); }

  _handleSubmit(e) {
    e.preventDefault();
    const { text, tasks } = this.state;

    // Add new task to array
    this.props.addTask(text);
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

const mapRxStateToProps = ({ tasks}) => ({
  tasks,
  addTask(task) { actions.addTask$.next(task); },
  deleteTask(id) { actions.deleteTask$.next(id); },
  toggleCheck(id) { actions.toggleCheck$.next(id); },
});

export default connect(mapRxStateToProps)(App);
