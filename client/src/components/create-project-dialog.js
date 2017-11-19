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

  static propTypes = {
    open: PropType.bool,
    handleRequestCloseDialog: PropType.func.isRequired
  }

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.handleRequestCloseDialog}>
        <DialogTitle>Новый проект</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создав новый проект, ты сможешь отслеживать задачи для него.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="URL"
            label="Название проекта"
            type="text"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleRequestCloseDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={this.props.handleRequestCloseDialog} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
