import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import CardHeader from '@material-ui/core/Avatar';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
        <Card className={classes.card}>
            <CardContent>
                <CardHeader avatar={
                    <Avatar aria-label="user" className={classes.avatar}>
                        User
                    </Avatar>
                }
                title='User'
                subheader='a few seconds ago'
                className={classes.header}
                />
                <Typography gutterBottom variant="headline" component="h2">
                    Name Your Item
                </Typography>
                <Typography component="p">
                    Describe Your Item
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" color="default">
                    Borrow
                </Button>
            </CardActions>
        </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);