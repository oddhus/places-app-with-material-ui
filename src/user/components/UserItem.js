import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#292929",
    "&:hover": {
      backgroundColor: theme.palette.common.amber
    }
  },
  avatar: {
    backgroundColor: red[500],
    minWidth: "3rem",
    minHeight: "3rem"
  },
  cardHeader: {
    textDecoration: "none",
    color: "white"
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
          <Typography variant="h5" component="h2">
           {props.name}
          </Typography>
        }
        subheader={
          <Typography varinat="body1" component="p">
            {`${props.placeCount} ${props.placeCount === 1 ? 'Place' : 'Places'}`}
          </Typography>
        }
        className={classes.cardHeader}
      />
    </Card>
  );
}

export default UserItem