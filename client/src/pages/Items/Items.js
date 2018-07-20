import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import styles from './styles'
import ItemsContainer from'../../containers/ItemsContainer'

const Items = ({ classes }) => {
  return (
    <ItemsContainer>
  {({ itemsData: { items, loading, error } }) => {
    if (loading ) {
    return 'loading'
    }
    if (error) {
      return 'error'
    }
    return items.map(item => (
      console.log(item)
    )
    )}
    }
</ItemsContainer>
)}

export default withStyles(styles)(Items)
