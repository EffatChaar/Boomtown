import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemContainer from '../../containers/ItemsContainer'
import ItemCard from '../../components/ItemCard'
import { Grid, Card, Typography, CardContent } from '@material-ui/core'
import styles from './styles'
import ItemsContainer from '../../containers/ItemsContainer';

const Profile = ({ classes }) => {
  return (
    <div>
      <Grid
        container spacing= {24}
        className= {classes.root}
      >
      <ItemsContainer>
        {({ usersData: { data, loading, error } }) => {
          if (loading) {
            return 'Loading ...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
            <div>
              <Card
                className= {classes.card}
              >
              <CardContent>
                <Typography
                  variant= 'headline'
                  component='h2'
                >
                  {data.user.fullname}
                </Typography>

                <Typography>
                  {data.user.bio}
                </Typography>
              </CardContent>
            </Card>
            {data.user.items.map( item => (
              <Grid
                key= {item.id}
                item xs= {12}
                sm= {6}
                lg= {4}
              >
              <ItemCard
                item= {item}
              />
            </Grid>
            ))}
          </div>
          )
        }}
      </ItemsContainer>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Profile)
