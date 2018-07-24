import { withStyles } from '@material-ui/core/styles'
import React from 'react'
// import styles from './styles'
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview'
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm'

const styles = {
  sharePage: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const Share = ({ classes }) => {
  return (
    <div className="sharePage">
      <ShareItemPreview />
      <ShareItemForm />
    
    </div>
  )
}

export default withStyles(styles)(Share)
