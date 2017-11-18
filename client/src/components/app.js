import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Tasks from './tasks';
import Toolbar from './toolbar';
import Markdown from 'react-markdown';

const styles = {
  main: {
    margin: '32px auto',
    maxWidth: 1240,
    fontFamily: 'Roboto',
    fontSize: '100%',
    lineHeight: 1.5
  }
};

export default class App extends React.Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    saved_tasks: PropTypes.array,
    description: PropTypes.string,
    active_task: PropTypes.number
  }

  static defaultProps = {
    tasks: [],
    saved_tasks: []
  }

  render() {
    return (
      <div>
        <Toolbar title="SEO Checklist"/>

        <main style={styles.main}>
          <Grid container spacing={40}>
            <Grid item sm={5}>
              <Tasks
                onTaskClick={this.props.onTaskClick}
                onChange={this.props.onChange}
                tasks={this.props.tasks}
                saved_tasks={this.props.saved_tasks}
                active_task={this.props.active_task}
              />
            </Grid>

            <Grid item sm={7}>
              <Markdown source={this.props.description}/>
            </Grid>

          </Grid>
        </main>

      </div>
    );
  }
}
