import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

export default class RemoveProjectDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    handleClickOpenDialog: PropTypes.func.isRequired,
    handleRequestCloseDialog: PropTypes.func.isRequired,
    removeProject: PropTypes.func.isRequired
  }

  removeProject = () => {
    this.props.removeProject();
    this.props.handleRequestCloseDialog();
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onRequestClose={this.props.handleRequestCloseDialog}>
          <DialogTitle>Удаление проекта</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Точно удаляем проект? Список задач для этого проекта также будет удалён.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestCloseDialog} color="primary" autoFocus>
              Не удалять
            </Button>
            <Button onClick={this.removeProject} color="primary">
              Удалять
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
