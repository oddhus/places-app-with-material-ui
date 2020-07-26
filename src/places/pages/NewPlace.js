import React from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid } from '@material-ui/core'

const NewPlace = () => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Grid container justify="center">
    <Grid item sm={8}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
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
          <Button type="submit" variant="contained" color="secondary">Add place</Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
    </Grid>
  );
}

export default NewPlace;