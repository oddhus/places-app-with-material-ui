import React from 'react'
import { Grid, Card, Typography} from '@material-ui/core'

export default function About() {
  return (
    <Grid container item justify="center" sm={12}>
        <Card style={{padding: "2em"}}>  
          <Typography variant="body1" component="h2">
            This MERN-stack was created by Oddmund Huseby to learn more about the technologies.
          </Typography>
        </Card>
      </Grid>
  )
}
