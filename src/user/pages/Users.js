import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: "Oddmund",
    image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    places: 3
  }]

  return <UsersList items={USERS}/>;
};

export default Users;
