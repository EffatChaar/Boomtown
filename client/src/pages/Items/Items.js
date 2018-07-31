import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import { Grid } from '@material-ui/core'
import ItemCard from '../../components/ItemCard'
import styles from './styles'


const Items = ({ classes }) => {
  return (
    <div>
       <Grid container spacing={24} className={classes.root}>
        <ItemsContainer>
        {({ itemsData: { items, loading, error } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          console.log(items)
          return items.map(item => (
            <Grid key={item.id} item xs={12} sm={6} lg={4}>
              <ItemCard item={item} />
            </Grid>
          ))
        }}
      </ItemsContainer>
    </Grid> 
    </div>
  )
}

export default withStyles(styles)(Items)
