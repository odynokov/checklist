import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    padding: '8px 16px',
    marginBottom: 32
  }
};

export default class Tasks extends React.Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    nested: PropTypes.bool,
    saved_tasks: PropTypes.array,
    active_task: PropTypes.number,
    tasks_disabled: PropTypes.bool
  }

  static defaultProps = {
    tasks: []
  }

  task(task) {
    return (
      <div>
        <Task
          nested={this.props.nested}
          key={task.id}
          task={task}
          onChange={this.props.onChange}
          onTaskClick={this.props.onTaskClick}
          checked={this.props.saved_tasks.has(task.id)}
          active_task={this.props.active_task}
          disabled={this.props.tasks_disabled}
        />

        <Tasks
          nested
          tasks={task.children}
          onChange={this.props.onChange}
          onTaskClick={this.props.onTaskClick}
          saved_tasks={this.props.saved_tasks}
          active_task={this.props.active_task}
          tasks_disabled={this.props.tasks_disabled}
        />
      </div>
    );
  }

  render() {

    return (
      <div>
        {this.props.tasks.map(task => (
          this.props.nested
            ? <div>{this.task(task)}</div>
            : <Paper style={styles.paper}>{this.task(task)}</Paper>
        ))}
      </div>
    );
  }
}
