import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import {FormGroup} from 'material-ui/Form';
import Button from 'material-ui/Button';

const styles = {
  button: {
    justifyContent: 'left',
    textAlign: 'left'
  },
  formGroup: {
    marginLeft: 48
  },
  nowrap: {
    flexWrap: 'nowrap'
  },
  active: {
    backgroundColor: 'rgba(63, 81, 181, 0.15)'
  }
};

export default class Task extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    nested: PropTypes.bool,
    active_task: PropTypes.number,
    checked: PropTypes.bool,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    disabled: PropTypes.bool
  }

  static defaultProps = {
    task: {}
  }

  render() {
    const active = this.props.active_task === this.props.task.id ? styles.active : null;

    return (
      <FormGroup row style={Object.assign({}, styles.nowrap, this.props.nested && styles.formGroup)}>
        <Checkbox
          disabled={this.props.disabled}
          checked={this.props.checked}
          onChange={this.props.onChange(this.props.task)}
        />
        <Button
          style={Object.assign({}, styles.button, active)}
          onClick={this.props.onTaskClick(this.props.task.id)}
        >{this.props.task.name}</Button>
      </FormGroup>
    );
  }
}
