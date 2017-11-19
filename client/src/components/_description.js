import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper';
import Markdown from 'react-markdown';
import IconButton from 'material-ui/IconButton';
import {withStyles} from 'material-ui/styles';
import Add from './plus-icon';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  paper: {
    padding: 16,
    margin: 16
  }
})


class Description extends React.Component {

  transition(props) {
    return <Slide direction="up" {...props} />;
  }

  render() {
    const {classes} = this.props;

    return (
      <Dialog
        maxWidth="md"
        open={this.props.open}
        onRequestClose={this.props.handleRequestClose}
        transition={Transition}
        transitionDuration={200}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.handleRequestClose} aria-label="Close">
              <Add />
            </IconButton>

            <Typography type="title" color="inherit">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
          <Paper className={classes.paper}>
            <Markdown source={this.props.body}/>
          </Paper>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Description);


Description.propTypes = {
  body: PropTypes.string
}
