import React, { useState } from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import axios from 'axios'

import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useHistory } from 'react-router-dom';
import { useStore } from '../../shared/store/store';
import { useObserver } from 'mobx-react-lite'

const NewPlace = () => {
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory()
  const { auth, ui } = useStore()

  const onSubmit = async ({title, description, address}) => {
    ui.setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/places/',{
        title,
        description,
        address,
        creator: auth.userId
      })
      ui.setIsLoading(false)
      ui.setStatusMessage('New place created!')
      ui.startShowStatus()
      history.push(`/${auth.userId}/places`)
    } catch (error) {
      ui.setIsLoading(false)
      ui.setErrorMessage(error.response ? error.response.data.message : "Ops, something went wrong. Please try again later!")
      ui.startShowError(true)
    }
  }  

  return useObserver(() => (
    <>
    <StatusBar open={ui.showError} setOpen={ui.setShowError} severity={"error"}>
      {ui.errorMessage}
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
            rules={{
              required: "This is required",
              minLength: {
                value: 5,
                message: "The description must be at least 5 characters"
              }
            }}
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
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={() => history.push(`/${auth.userId}/places`)}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="secondary" disabled={ui.isLoading}>
                {ui.isLoading ? <CircularProgress size={16}/> : "Add place"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
    </Grid>
    </Grid>
    </>
  ))
}

export default NewPlace;