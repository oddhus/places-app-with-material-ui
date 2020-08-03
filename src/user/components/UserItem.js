import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    minWidth: "3rem",
    minHeight: "3rem"
  },
  cardHeader: {
    textDecoration: "none",
    color: "#292929",
    justifyContent:"center",
    alignItems: "center"
  },
  subheader: {
    fontSize: 16
  }
}));

const UserItem = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader component={Link} to={`/${props.id}/places`}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={props.image} alt={props.alt}>
            R
          </Avatar>
        }
        title={
          <Typography variant="h6">
           {props.name}
          </Typography>
        }
        subheader={
          <Typography varinat="body1" component="p" className={classes.subheader}>
            {`${props.placeCount} ${props.placeCount === 1 ? 'Place' : 'Places'}`}
          </Typography>
        }
        className={classes.cardHeader}
      />
    </Card>
  );
}

export default UserItem