import React from 'react';
import PropType from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class CreateProjectDialog extends React.Component {

  state = {
    project: ''
  }

  static propTypes = {
    open: PropType.bool,
    handleRequestCloseDialog: PropType.func.isRequired,
    createProject: PropType.func.isRequired
  }

  createProject = () => {
    this.props.createProject(this.state.project.trim());
    this.setState({project: ''});
    this.props.handleRequestCloseDialog();
  }

  handleRequestCloseDialog = () => {
    this.setState({project: ''});
    this.props.handleRequestCloseDialog();
  }

  handleInput = event => {
    this.setState({project: event.target.value.replace(/^\s+/, '').replace(/\s{2,}$/, ' ')});
  }

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.handleRequestCloseDialog}>
        <DialogTitle>Новый проект</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создав новый проект, ты сможешь создать отдельный список задач.
          </DialogContentText>
          <TextField
            value={this.state.project}
            autoFocus
            margin="dense"
            id="URL"
            label="Название проекта"
            type="text"
            fullWidth
            required
            onInput={this.handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestCloseDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={this.createProject} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
