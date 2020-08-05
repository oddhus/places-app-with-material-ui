import React, {useState} from 'react';
import 'mobx-react-lite/batchingForReactDom'
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './shared/components/Navigation/Header';
import theme from './shared/components/UIElements/theme';
import AuthRoutes from './shared/components/Navigation/AuthRoutes';
import { StoreProvider } from './shared/store/store';

const App = () => {
  const [value, setValue] = useState(0)

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header value={value} setValue={setValue} />
          <main>
            <Container ml={[0, 5]} mr={[0, 5]}>
              <AuthRoutes />
            </Container>
          </main>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App;
