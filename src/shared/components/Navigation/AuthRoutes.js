import React from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

import UpdatePlace from '../../../places/pages/UpdatePlace'
import Users from '../../../user/pages/Users';
import NewPlace from '../../../places/pages/NewPlace';
import UserPlaces from '../../../places/pages/UserPlaces'
import About from '../../../user/pages/About';
import Auth from '../../../user/pages/Auth'

export default function AuthRoutes() {

  const { isLoggedIn } = useAuth()

  const authRoutes = (
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/:userId/places" exact component={UserPlaces} />
      <Route path="/places/new" exact component={NewPlace} />
      <Route path="/places/:placeId" exact component={UpdatePlace} />
      <Route path="/about" exact component={About} />
      <Redirect to="/" />
    </Switch>
  )

  const unAuthRoutes = (
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/:userId/places" exact component={UserPlaces} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/about" exact component={About} />
      <Redirect to="/auth" />
    </Switch>
  )

  if (isLoggedIn){
    return authRoutes
  } else {
    return unAuthRoutes
  }

}
