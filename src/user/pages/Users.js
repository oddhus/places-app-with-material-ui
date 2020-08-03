import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import axios from 'axios'

import UsersList from '../components/UsersList';
import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useAuth } from '../../shared/context/auth-context';
import { CircularProgress, Grid } from '@material-ui/core';

const usersEndpoint = "http://localhost:5000/api/users";

const getData = async () => {
  const response = await axios(usersEndpoint);
  return response.data.users
};

const Users = () => {
  const { isNewUser } = useAuth()
  const [haveCreatedUser, sethaveCreatedUser] = useState(false)

  useEffect(() => {
    sethaveCreatedUser(isNewUser)
  }, [isNewUser])

  const { data: users } = useSWR(usersEndpoint, getData);

  if(!users){
    return (
      <Grid container item justify="center">
        <CircularProgress />
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
