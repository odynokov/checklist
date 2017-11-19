import React from 'react';
import tasks from './tasks.yaml';

const __KEY__ = 'checklist:tasks:done';

const local = JSON.parse(localStorage.getItem(__KEY__));

export default WrappedComponent => class AppContainer extends React.Component {

  state = {
    saved_tasks: new Set(local),
    description: null,
    active_task: null
  }

  onChange = task => (event, value) => {
    const {saved_tasks} = this.state;

    // отметить или снять отметки с дочерних задачи при работе с родительской
    task.children && task.children.forEach(item => {
      value ? saved_tasks.add(item.id) : saved_tasks.delete(item.id);
    });

    // снять отметку с родительской задачи, при снятии отметки с дочерней
    !value && task.parent_id && saved_tasks.delete(task.parent_id);

    // пометить задачу или снять отметку
    value ? saved_tasks.add(task.id) : saved_tasks.delete(task.id);

    const parent_task = tasks.find(item => item.id === task.parent_id);
    const all_children_tasks_completed = parent_task
      && parent_task.children
      && parent_task.children.every(item => saved_tasks.has(item.id));

    all_children_tasks_completed
      && saved_tasks.add(parent_task.id);

    localStorage.setItem(__KEY__, JSON.stringify([...saved_tasks]));

    this.setState({saved_tasks});
  }

  onTaskClick = id => () => {
    fetch(`/docs/${id}.md`)
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
