import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import styles from './styles'
import ItemsContainer from'../../containers/ItemsContainer'
import Grid from '@material-ui/core/Grid'
import Header from '../../components/Header/AppBar'
import ItemElement from '../../components/ItemElement/ItemElement';


const Items = ({ classes }) => {
  return (
    <div>
      <Header />
      <ItemElement />
      <ItemsContainer>
        {({ itemsData: { items, loading, error } }) => {
        if (loading ) {
        return 'loading'
        }
        if (error) {
          return 'error'
        }
        return items.map(item => (
          console.log('hi')
        )
        )}
        }
      </ItemsContainer>
    </div>
)}

export default withStyles(styles)(Items)
