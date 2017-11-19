import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Tasks from './tasks';
import Toolbar from './toolbar';
import Markdown from 'react-markdown';
import Button from 'material-ui/Button';
import styles from './app.css';
import CreateProjectDialog from './create-project-dialog';
import RemoveProjectDialog from './remove-project-dialog';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import AddProjectIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';

export default class App extends React.Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    saved_tasks: PropTypes.array,
    description: PropTypes.string,
    active_task: PropTypes.number,
    clearTasks: PropTypes.func.isRequired,
    current_project: PropTypes.string,
    changeProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    createProject: PropTypes.func.isRequired,
    removeProject: PropTypes.func.isRequired,
    handleRequestSnackbarClose: PropTypes.func.isRequired,
    snackbar_message: PropTypes.string,
    snackbar_open: PropTypes.bool
  }

  static defaultProps = {
    tasks: [],
    saved_tasks: []
  }

  state = {
    createDialogOpen: false,
    removeDialogOpen: false
  }

  handleClickOpenCreateDialog = () => {
    this.setState({createDialogOpen: true});
  }

  handleRequestCloseCreateDialog = () => {
    this.setState({createDialogOpen: false});
  }

  handleClickOpenRemoveDialog = () => {
    this.setState({removeDialogOpen: true});
  }

  handleRequestCloseRemoveDialog = () => {
    this.setState({removeDialogOpen: false});
  }

  render() {
    return (
      <div>
        <Toolbar title="SEO Checklist"/>

        <main className={styles.main}>
          <Grid container spacing={40}>
            <Grid item sm={5} className={styles.column}>

              {
                this.props.projects.length > 0 && (
                  <div className={styles.flexRow}>
                    <FormControl className={styles.formControl}>
                      <InputLabel htmlFor="project">Выбери проект</InputLabel>
                      <Select
                        value={this.props.current_project}
                        onChange={this.props.changeProject}
                        input={<Input id="project" />}
                      >
                        {this.props.projects.map(item => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {
                      this.props.current_project && (
                        <Button
                          color="accent"
                          onClick={this.handleClickOpenRemoveDialog}
                        >Удалить</Button>
                      )
                    }
                  </div>
                )
              }

              <Tasks
                onTaskClick={this.props.onTaskClick}
                onChange={this.props.onChange}
                tasks={this.props.tasks}
                saved_tasks={this.props.saved_tasks}
                active_task={this.props.active_task}
                tasks_disabled={!this.props.current_project}
              />

              <Button raised color="primary" onClick={this.props.clearTasks}>Очистить список</Button>
            </Grid>

            <Grid item sm={7} className={styles.column}>
              <Markdown source={this.props.description}/>
            </Grid>

          </Grid>
        </main>

        <CreateProjectDialog
          handleClickOpenDialog={this.handleClickOpenDialog}
          handleRequestCloseDialog={this.handleRequestCloseCreateDialog}
          createProject={this.props.createProject}
          open={this.state.createDialogOpen}
        />

        <RemoveProjectDialog
          handleClickOpenDialog={this.handleClickOpenRemoveDialog}
          handleRequestCloseDialog={this.handleRequestCloseRemoveDialog}
          open={this.state.removeDialogOpen}
          removeProject={this.props.removeProject}
        />

        <Button
          className={styles.createButton}
          fab
          color="primary"
          onClick={this.handleClickOpenCreateDialog}
        ><AddProjectIcon/></Button>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onRequestClose={this.props.handleRequestSnackbarClose}
          open={this.props.snackbar_open}
          autoHideDuration={2000}
          message={this.props.snackbar_message}
        />

      </div>
    );
  }
}
