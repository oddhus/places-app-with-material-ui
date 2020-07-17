import React from 'react'

import { Grid, Typography, Card, Button } from '@material-ui/core'

import PlaceItem from './PlaceItem'

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <Typography variant="h5" component="h2">
            No places found. Maybe create one?
          </Typography>
          <Button>Share Place</Button>
        </Card>
      </div>
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      {items.map(place => (
        <Grid item key={place.id} sm={6}>
          <PlaceItem
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creatorId}
            coordinates={place.location}
          />
        </Grid>
      ))}
    </Grid>
  )
};

export default PlaceList