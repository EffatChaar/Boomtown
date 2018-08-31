import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import Boomtown from './../../images/Boomtown.svg'
import AddButton from './AddButton/AddButton'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/icons/AddCircle'
import styles from './styles'


function Header(props) {
  const { classes } = props

  return (
    <div className={classes.root} >
      <AppBar position= 'static'>
        <Toolbar className= {classes.AppBar}>
          <Link to= '/items' >
            <img
              src= {Boomtown}
              alt= 'Boomtown-logo'
              style= {{
                display:'inline',
                width: 50,
                height: 50,
                maxHeight:'50px',
              marginBottom: '20px'}}
              />
          </Link>

          <div>
            <Link to='/share'>
              <Button
                className= {classes.shareButton}
                variant= 'extendedFab'
                color= 'black'
                component= {Link}
                to= '/share'
              >
            <Icon style={{ margin: '20px' }} /> SHARE SOMETHING
          </Button>
            </Link>
            <Menu />
        </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)