import React from 'react'

import UserItem from './UserItem'
import { Card, Typography, Grid } from '@material-ui/core'

const UsersList = ({ items }) => {
    if (items.length === 0) {
        return (
          <Grid container item justify="center">
            <Card>
              <Typography variant="h5" component="h2">
                No places found. Maybe create one?
              </Typography>
            </Card>
          </Grid>
        )
    }

    return (
      <Grid container spacing={2} justify="center">
        {items.map(user => (
            <Grid item key={user.id} sm={3}>
              <UserItem 
                  id={user.id} 
                  image={user.image} 
                  name={user.name} 
                  placeCount={user.places} 
              />
            </Grid>
        ))}
      </Grid>
    )
}

export default UsersList