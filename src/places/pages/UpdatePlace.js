import React, { useEffect } from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid, Card, Typography, CardContent } from '@material-ui/core'
import { useParams } from 'react-router-dom'

const DUMMY_PLACES = [{
  id: 'p1',
  title: 'Empire State Building',
  description: 'One of the most famous sky scrapers in the world',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
  address: '20 W 34th St, New York, NY 10001, USA',
  location: {
      lat: 40.7484405,
      lng: -73.9878584
  },
  creatorId: 'u1'
}, {
  id: 'p2',
  title: 'Empire State Building',
  description: 'One of the most famous sky scrapers in the world',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
  address: '20 W 34th St, New York, NY 10001, USA',
  location: {
      lat: 40.7484405,
      lng: -73.9878584
  },
  creatorId: 'u2'
}]

export default function UpdatePlace() {
  const placeId = useParams().placeId
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

  const { control, handleSubmit, errors,reset } = useForm();
  
  const onSubmit = data => console.log(data);

  useEffect(() => {
    //const result = await fetch('./api/formValues.json'); // result: { firstName: 'test', lastName: 'test2' }
    if(identifiedPlace){
      reset({
        title: identifiedPlace.title,
        description: identifiedPlace.description,
        address: identifiedPlace.address
      });
    }
  }, [reset, identifiedPlace])

  if (!identifiedPlace) {
    return (
      <Grid container justify="center">
        <Grid item>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Could not find place.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justify="center">
    <Grid item sm={8}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2} style={{width: "100%"}}>
        <Grid item>
          <Controller
            as={TextField}
            rules={{required: "This is required"}}
            control={control}
            defaultValue=""
            name="title"
            label="Title"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Controller
            as={TextField}
            rules={{required: "This is required"}}
            control={control}
            defaultValue=""
            name="description"
            multiline
            rows={4}
            variant="outlined"                
            label="Description"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Controller
            as={TextField}
            control={control}
            rules={{required: "This is required"}}
            defaultValue=""
            name="address"
            label="Address"
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ""}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="secondary">Update place</Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
    </Grid>
  );
}
