import React, { useState } from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import axios from 'axios'

import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useHistory } from 'react-router-dom';
import { useStore } from '../../shared/store/store';

const NewPlace = () => {
  const { control, handleSubmit, errors } = useForm();
  const [dbError, setDbError] = useState("")
  const [openError, setOpenError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { auth } = useStore()

  const onSubmit = async ({title, description, address}) => {
    setOpenError(false)
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/places/',{
        title,
        description,
        address,
        creator: auth.userId
      })
      setIsLoading(false)
      history.push(`/${auth.userId}/places`)
    } catch (error) {
      setIsLoading(false)
      setDbError(error.response.data.message)
      setOpenError(true)
    }
  }  

  return (
    <>
    <StatusBar open={openError} setOpen={setOpenError} severity={"error"}>
        {dbError}
    </StatusBar>
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
          <Button type="submit" variant="contained" color="secondary">
            {!isLoading && "Add place"}
            {isLoading && <CircularProgress size={16}/>}
          </Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
    </Grid>
    </>
  );
}

export default NewPlace;