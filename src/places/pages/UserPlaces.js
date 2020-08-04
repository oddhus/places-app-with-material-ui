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

  const { data, error } = useSWR(key, () => getData(userId))

  const { ui } = useStore()

  return useObserver(() => (
      !data && !error 
        ? <Grid container item justify="center">
            <CircularProgress/>
          </Grid> 
        : <> 
            <StatusBar open={ui.updatedPlace} setOpen={ui.setUpdatedPlace} severity={"success"}>
              {"Place updated!"}
            </StatusBar>
            <PlaceList items={data}/>
          </>
  ))
}

export default UserPlaces