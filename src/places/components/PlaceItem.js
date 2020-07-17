import React from 'react'
import { Card, Typography, CardActionArea, CardContent, CardMedia, Button, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  pos: {
    marginBottom: 12,
  },
});

const PlaceItem = props => {
  const classes = useStyles();
  return (
  <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography color="textSecondary" variant="body2" component="p" className={classes.pos}>
            {props.address}
          </Typography>
          <Typography variant="body1">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View on map
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}


export default PlaceItem