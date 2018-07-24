import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import styles from './styles'
import ItemShare from '../../components/ItemShare/ItemShare'

const Share = ({ classes }) => {
  return (
    <div>
      <ItemShare />
    
    </div>
  )
}

export default withStyles(styles)(Share)
