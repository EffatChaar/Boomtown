import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Menu from './Menu/Menu';
import { Link } from 'react-router-dom';
import Boomtown from './../../images/Boomtown.svg'
import AddButton from './AddButton/AddButton'
import styles from './styles'




function Header(props) {
  const { classes } = props
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.AppBar}>
          <Link to='./items'>
            <img src={Boomtown} alt='Boomtown-logo' style={{display:'inline', maxHeight:'50px'}}/>
          </Link>
        <div className={classes.ShareButton}>
            <Link to='./share'>
              <AddButton />
             
            </Link>
            <Menu />
        </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)