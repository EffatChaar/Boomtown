import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles'


class ItemCard extends Component {
  render() {
    const { classes, item } = this.props
    return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className = {classes.media}
          image = {item.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography component="p">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" color="default">
            Borrow
          </Button>
        </CardActions>
      </Card>
    </div>
  );}
}

export default withStyles(styles)(ItemCard)