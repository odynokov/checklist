import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  flex: {
    flex: 1
  }
};

export default class extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={styles.flex}>
            {this.props.title}
          </Typography>

          {this.props.children}
        </Toolbar>
      </AppBar>
    );
  }
}
