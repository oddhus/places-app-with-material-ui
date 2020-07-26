import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces'
import Header from './shared/components/Navigation/Header';
import theme from './shared/components/UIElements/theme';
import { Container } from '@material-ui/core';
import UpdatePlace from './places/pages/UpdatePlace';

const App = () => {
  const [value, setValue] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Header value={value} setValue={setValue}/>
      <main>
        <Container ml={[0,5]} mr={[0,5]}>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId" exact>
              <UpdatePlace />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
      </main>
      </Router>
    </ThemeProvider>
  )
}

export default App;
