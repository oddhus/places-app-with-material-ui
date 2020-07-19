import React, { useState } from 'react'
import { Card, Typography, CardActionArea, CardContent, CardMedia, Button, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import SimpleMap from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal'

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
  const [open, setOpen] = useState(false)
  return (
    <React.Fragment>
    <Modal open={open} setOpen={setOpen} header={props.address}>
      <SimpleMap location={props.location} title={props.title}/>
    </Modal>
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
        <Button size="small" color="primary" variant="outlined" onClick={()=>setOpen(true)}>
          View on map
        </Button>
        <Button size="small" color="primary" variant="contained">
          Edit
        </Button>
        <Button size="small" color="secondary" variant="contained">
          Delete
        </Button>
      </CardActions>
    </Card>
    </React.Fragment>
  )
}


export default PlaceItem