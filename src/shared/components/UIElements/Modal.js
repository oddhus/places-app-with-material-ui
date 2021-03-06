import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 3,
  },
  paper: {
    width: 700,
    [theme.breakpoints.down("md")]: {
      width: 500
    },
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({open, setOpen, header, children}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5" component="h2">{header}</Typography>
            </Grid>
            <Grid item>
              {children}
            </Grid>
            <Grid container item justify="center">
              <Button onClick={handleClose} variant="outlined">Close</Button>
            </Grid>
          </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}