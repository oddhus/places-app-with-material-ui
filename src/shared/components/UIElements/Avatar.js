import React from 'react';


import './Avatar.css';
import { CardHeader, Card } from '@material-ui/core';

const Avatar = props => {
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img
              src={props.image}
              alt={props.alt}
              style={{ width: props.width, height: props.width }}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
};

export default Avatar;
