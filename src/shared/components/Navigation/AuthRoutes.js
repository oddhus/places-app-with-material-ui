import React from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import UpdatePlace from '../../../places/pages/UpdatePlace'
import Users from '../../../user/pages/Users';
import NewPlace from '../../../places/pages/NewPlace';
import UserPlaces from '../../../places/pages/UserPlaces'
import About from '../../../user/pages/About';
import Auth from '../../../user/pages/Auth'
import { useStore } from '../../store/store';
import { useObserver } from 'mobx-react-lite';

export default function AuthRoutes() {

  const { auth } = useStore()

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

  return useObserver(() => (
    auth.token ? authRoutes : unAuthRoutes
  ))
}
