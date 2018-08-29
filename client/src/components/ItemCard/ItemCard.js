import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Typography, Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import moment from 'moment'
import styles from './styles'
import PropTypes from 'prop-types'

const ItemCard =({ classes, item })=> {
  return (
    <Card className= {classes.card}>
      <CardMedia
        className= {classes.media}
        image= {item.imageurl}
      />
      <Link to={`/profile/${item.itemowner.id}`}>
      <CardHeader
          avatar={
            <Gravatar
              className= {classes.avatar}
              email= {item.itemowner.email}
            />
          }
          title= {item.itemowner.fullname}
          subheader= {moment(new Date(item.created)).fromNow()}
          className= {classes.header}
        />
      </Link>
      <CardContent>
        <Typography
          gutterBottom variant='headline'
          component='h2'>
          {item.title}
        </Typography>

        <Typography
          component='p'
          variant='caption' >
          {item.tags.map(tag => tag.title).join(', ')}
        </Typography>

        <Typography component='p'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='default'>
          Borrow
        </Button>
      </CardActions>
    </Card>
  )
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.shape({
    itemowner: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired
    }),
    imageurl: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    ),
    description: PropTypes.string.isRequired
  })
}

export default withStyles(styles)(ItemCard)