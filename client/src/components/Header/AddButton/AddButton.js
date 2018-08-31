import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import styles from './styles'


function AddButton(props) {
  const { classes } = props;
  return (
    <div className= {classes.component}>
      <Button
        variant='extendedFab'
        mini color='secondary'
        aria-label='Add'
        className= {classes.button}
      >
      <AddIcon className= {classes.addButton} />
        Share Something
      </Button>
    </div>
  )
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddButton)