import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList';
import SuccessBar from '../../shared/components/UIElements/SuccessBar'
import { useAuth } from '../../shared/context/auth-context';

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: "Oddmund",
    image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    places: 3
  }]

  const { isNewUser } = useAuth()
  const [haveCreatedUser, sethaveCreatedUser] = useState(false)

  useEffect(() => {
    sethaveCreatedUser(isNewUser)
  }, [isNewUser])

  return <>
      <SuccessBar open={haveCreatedUser} setOpen={sethaveCreatedUser} message={"Profile created successfully!"} />
      <UsersList items={USERS}/>;
    </>
};

export default Users;
