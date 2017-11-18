import React from 'react';
import tasks from './tasks.yaml';

const __KEY__ = '__checklist__';

const local = JSON.parse(localStorage.getItem(__KEY__));

export default WrappedComponent => class AppContainer extends React.Component {

  state = {
    saved_tasks: new Set(local),
    description: null,
    active_task: null
  }

  onChange = task => (event, value) => {
    const {saved_tasks} = this.state;

    task.children && task.children.forEach(item => {
      value ? saved_tasks.add(item.id) : saved_tasks.delete(item.id);
    });

    !value && task.parent_id && saved_tasks.delete(task.parent_id);

    value ? saved_tasks.add(task.id) : saved_tasks.delete(task.id);

    localStorage.setItem(__KEY__, JSON.stringify([...saved_tasks]));

    this.setState({saved_tasks});
  }

  onTaskClick = id => () => {
    fetch(`/dist/docs/${id}.md`)
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw new Error('There is no description');
        }

        return response.text();
      })
      .then(description => {
        description && this.setState({description, active_task: id});
      })
      .catch(() => {
        this.setState({description: 'Пока что нет подробностей'});
      });
  }

  render() {
    return (
      <WrappedComponent
        tasks={tasks}
        saved_tasks={this.state.saved_tasks}
        onChange={this.onChange}
        onTaskClick={this.onTaskClick}
        description={this.state.description}
        active_task={this.state.active_task}
      />
    );
  }
};
