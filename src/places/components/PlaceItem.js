import React, { useState } from 'react'
import { Card, Typography, CardActionArea, CardContent, CardMedia, Button, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useStore } from '../../shared/store/store';
import { useObserver } from 'mobx-react-lite';

import SimpleMap from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal'
import AlertDialog from './AlertDialog';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    }
  },
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
}));

const PlaceItem = props => {
  const classes = useStyles();
  const [openMap, setOpenMap] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { auth } = useStore()

  return useObserver(() =>(
    <React.Fragment>
    <Modal open={openMap} setOpen={setOpenMap} header={props.address}>
      <SimpleMap location={props.location} title={props.title}/>
    </Modal>
    <AlertDialog open={openDialog} setOpen={setOpenDialog} id={props.id} handleDelete={props.handleDelete}>
    </AlertDialog>
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
        <Button size="small" color="primary" variant="outlined" onClick={() => setOpenMap(true)}>
          View on map
        </Button>
        {auth.userId === props.creator && <Button size="small" color="primary" variant="contained" component={Link} to={`/places/${props.id}`}>
          Edit
        </Button>}
        {auth.userId === props.creator && <Button size="small" className={classes.button} onClick={() => setOpenDialog(true)}>
          Delete
        </Button>}
      </CardActions>
    </Card>
    </React.Fragment>
  ))
}


export default PlaceItem