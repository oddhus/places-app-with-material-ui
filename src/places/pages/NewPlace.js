import React, {useState, useEffect} from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import ImageUploader from "react-images-upload";

import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useHistory } from 'react-router-dom';
import { useStore } from '../../shared/store/store';
import { useObserver } from 'mobx-react-lite'

const NewPlace = () => {
  const { control, handleSubmit, errors, register, setValue } = useForm();
  const history = useHistory()
  const { auth, ui } = useStore()

  const onDrop = picture => {
    setValue( 'image', picture)
  };

  useEffect(() => {
    register({ name: 'image' })
  }, [])

  const onSubmit = async ({title, description, address, image}) => {
    ui.setIsLoading(true)
    const placeFormData = new FormData();
    placeFormData.append("image", image ? image[0] : null)
    placeFormData.append("title", title);
    placeFormData.append("description", description);
    placeFormData.append("address", address);
    placeFormData.append("creator", auth.userId);

    try {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/places/",
        data: placeFormData,
        headers: {
        'Content-Type': 'multipart/form-data;'
        }
      })
      ui.setStatusMessage('New place created!')
      ui.setIsLoading(false)
      ui.startShowStatus(true)
      history.push(`/${auth.userId}/places`)
    } catch (error) {
      ui.setStatusMessage(error.response ? error.response.data.message : "Ops, something went wrong. Please try again later!")
      ui.setIsLoading(false)
      ui.startShowStatus(true)
    }
  }  

  return useObserver(() => (
    <>
    <StatusBar open={ui.showStatus} setOpen={ui.setShowStatus} severity={"error"}>
      {ui.statusMessage}
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
          <ImageUploader
            withPreview
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
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