/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'redux-zero/react';
import { Router, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Footer from 'Components/Footer';
import Header from 'Components/Header';
// import Parallax from 'Components/Parallax';

import StartSection from 'Sections/StartSection';
import InfoSections from 'Sections/InfoSections';
import Gallery from 'Sections/Gallery';
import Modlist from 'Sections/Modlist';
import StatusDashboard from 'Sections/StatusDashboard';
import StatusPage from 'Sections/StatusPage';

import { theme, elevation2 } from './assets/jss/theme';

const mainRaised = {
  background: elevation2,
  borderRadius: '6px',
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

export default function App(props) {
  const { store, history } = props;

  const { userAgent } = window.navigator;
  const isIE = /MSIE|Trident/.test(userAgent);

  if (isIE)
    return (
      <div>
        <h1>Stop using IE!</h1>
        <img src="https://i.imgflip.com/ywgpb.jpg" alt="STOP IT!"></img>
      </div>
    );

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <div>
            <Header />
            {/* <Parallax /> */}
            <Box style={mainRaised} m={4}>
              <Route exact path="/" render={() => <StartSection />} />
              <Route
                path="/info/:url"
                render={url => <InfoSections url={url} />}
              />
              <Route exact path="/gallery" render={() => <Gallery />} />
              <Route
                path="/modlist/:url"
                render={url => <Modlist url={url} />}
              />
              <Route exact path="/status" render={() => <StatusDashboard />} />
              <Route
                path="/status/:url"
                render={url => <StatusPage url={url} />}
              />
            </Box>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
