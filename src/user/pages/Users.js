import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import axios from 'axios'
import { CircularProgress, Grid, Typography } from '@material-ui/core';

import UsersList from '../components/UsersList';
import StatusBar from '../../shared/components/UIElements/StatusBar'
import { red } from '@material-ui/core/colors';
import { useStore } from '../../shared/store/store';

const usersEndpoint = `${process.env.REACT_APP_API_URL}/api/users`;

const getData = async () => {
  try {
    const response = await axios(usersEndpoint);
    return response.data.users
  } catch (error) {
    throw error
  }
};

const Users = () => {
  const { auth } = useStore()
  const [haveCreatedUser, sethaveCreatedUser] = useState(false)

  useEffect(() => {
    sethaveCreatedUser(auth.isNewUser)
  }, [auth.isNewUser])

  const { data: users, error } = useSWR(usersEndpoint, getData);

  if(error){
    return (
      <Grid container item justify="center">
        <Typography variant="h4" style={{color: red[400], marginTop: "5em"}}>
          Something went wrong! Please try again later...
        </Typography>
      </Grid>
    )
  }

  if(!users){
    return (
      <Grid container item justify="center">
        <CircularProgress style={{marginTop: "5em"}} />
      </Grid>
    )
  }

  return <>
      <StatusBar open={haveCreatedUser} setOpen={sethaveCreatedUser} severity={"success"}>
        Profile created successfully!
      </StatusBar>
      <UsersList items={users}/>
    </>
};

export default Users;
