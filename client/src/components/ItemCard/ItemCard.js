import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React, { Component } from 'react'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core'
import styles from './styles'

class ItemCard extends Component {
  render() {
    const { classes, item } = this.props
    const itemTags = item.tags.map(tag => tag.title)
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={item.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography component="p">
            {itemTags.join(', ')}
          </Typography>
          <Typography component="p">{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Borrow
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(ItemCard)