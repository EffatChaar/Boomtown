import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ItemCard from '../../components/ItemCard'
import styles from './styles'


const Items = ({ classes }) => {
  return (
    <div>
        <ItemsContainer>
        {({ itemsData: { items, loading, error } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return items.map(item => (
            <ItemCard key={ item.id } item={ item }/>
          ))
        }}
      </ItemsContainer> 
    </div>
  )
}

export default withStyles(styles)(Items)
