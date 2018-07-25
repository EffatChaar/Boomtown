import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { Grid } from '@material-ui/core'
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'
import styles from './styles'

const Share = ({ classes }) => {
  return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={12}>
          <ShareItemForm />
        </Grid>
      </Grid>
  )
}

export default withStyles(styles)(Share)