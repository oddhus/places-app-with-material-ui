import React, { useEffect } from 'react'
import { useForm, Controller }  from 'react-hook-form'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'

import { useStore } from '../../shared/store/store'
import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useObserver } from 'mobx-react-lite'


const placeEndpoint = "http://localhost:5000/api/places";

const getData = async (id) => {
  try {
    const response = await axios(`${placeEndpoint}/${id}`);
    return response.data.place
  } catch (error) {
    throw error
  }
};

const updateTodo = async (id, title, description, setDbError, showError) => {
  try {
    const response = await axios.patch(`${placeEndpoint}/${id}`, {
      title,
      description
    });
    return  response.data.place;
  } catch (error) {
    console.log(error.response)
    setDbError(error.response ? error.response.data.message : "Something went wrong... Could not update place!")
    showError()
    throw error
  }
};

export default function UpdatePlace() {
  const { placeId } = useParams()
  const { control, handleSubmit, errors,reset } = useForm();
  const { ui, auth } = useStore()
  const history = useHistory()

  const key = `${placeEndpoint}/${placeId}`;
  const { data, error, mutate, isValidating } = useSWR(key, () => getData(placeId))
  
  const onSubmit = async ({title, description}) => {
    ui.setIsLoading(true)
    const updatedplace = {
      ...data,
      title,
      description
    }
    await updateTodo(placeId,title, description, ui.setErrorMessage, ui.startShowError)
    mutate(updatedplace)
    ui.setIsLoading(false)
    ui.setStatusMessage('Place updated!')
    ui.startShowStatus()
    history.push(`/${auth.userId}/places`)
  }

  useEffect(() => {
    if(data){
      reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [reset, data, isValidating])

  return useObserver(() => (
    <>
    <StatusBar open={ui.showError} setOpen={ui.setShowError} severity={"error"}>
      {ui.errorMessage}
    </StatusBar>
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
         <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={() => history.push(`/${auth.userId}/places`)}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="secondary" disabled={ui.isLoading}>
              {ui.isLoading ? <CircularProgress size={16}/> : "Update Place"}
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
