import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GlobalStyles from 'src/components/GlobalStyles';
import ScrollReset from 'src/components/ScrollReset';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import { AuthProvider } from 'src/contexts/AuthContext';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import routes, { renderRoutes } from 'src/routes';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();

const App: FC = () => {
  const { settings } = useSettings();

  const theme = createTheme({
    theme: settings.theme
  });

  useEffect(() => {
    const onScroll: EventListener = (event: Event) => { // <-- DOM-EventListener
        console.log("event", event.target);
    };

    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
              <Router history={history}>
                <AuthProvider>
                  <GlobalStyles />
                  <ScrollReset />
                  <GoogleAnalytics />
                  {renderRoutes(routes)}
                </AuthProvider>
              </Router>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
