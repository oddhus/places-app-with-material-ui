import React from 'react'

import { Grid, Typography, Card } from '@material-ui/core'

import PlaceItem from './PlaceItem'

const PlaceList = ({ items, handleDelete }) => {

  if (!items) {
    return (
      <Grid container item justify="center" sm={12}>
        <Card style={{padding: "2em"}}>  
          <Typography variant="h5" component="h2">
            No places found. Maybe create one?
          </Typography>
        </Card>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      {items.map((place, i) => (
        <Grid item key={`${place.id}-${i}`} sm={6}>
          <PlaceItem
            handleDelete={handleDelete}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            location={place.location}
          />
        </Grid>
      ))}
    </Grid>
  )
};

export default PlaceList