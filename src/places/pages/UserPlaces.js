import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import { Grid, CircularProgress } from '@material-ui/core'
import { useStore } from '../../shared/store/store'

import PlaceList from '../components/PlaceList'
import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useObserver } from 'mobx-react-lite'

const userPlacesEndpoint = "http://localhost:5000/api/places/user";

const getData = async (id) => {
  try {
    const response = await axios(`${userPlacesEndpoint}/${id}`);
    return response.data.places
  } catch (error) {
    throw error
  }
};

const UserPlaces = () => {
  const { userId } = useParams()
  const key = `${userPlacesEndpoint}/${userId}`

  const { data, error, mutate } = useSWR(key, () => getData(userId))
  const { ui, auth } = useStore()

  const handleDelete = async (id) => {
    ui.setIsLoading(true)
    try {
      await axios.delete(`http://localhost:5000/api/places/${id}`, {
        headers: {
          'Authorization': `token ${auth.token}`
        }
      } )
      await mutate(async places => {
        const index = places.findIndex(place => place.id === id) + 1
        return [...places.slice(index)]
      })
      ui.setStatusMessage("Place deleted!")
    } catch (error) {
      ui.setStatusMessage(error.response ? error.response.data.message : "Something went wrong, could not delete place.")
      ui.isError = true
    }
    ui.setIsLoading(false)
    ui.startShowStatus()
  }

  return useObserver(() => (
      !data && !error 
        ? <Grid container item justify="center">
            <CircularProgress/>
          </Grid> 
        : <> 
            <StatusBar open={ui.showStatus} setOpen={ui.setShowStatus} severity={ui.isError ? "error" : "success"}>
              {ui.statusMessage}
            </StatusBar>
            <PlaceList items={data} handleDelete={handleDelete}/>
          </>
  ))
}

export default UserPlaces