/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

// routing
import Routes from 'routes';

// store
import { DefaultRootStateProps } from 'types';

// defaultTheme
import themes from 'themes';

// project imports
import AlertQueue from 'views/common/alert-queue';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ConfirmDialog from 'ui-component/ConfirmDialog';

// auth provider
import { GraphqlProvider } from 'contexts/GraphqlContext';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: DefaultRootStateProps) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {/* RTL layout */}
          {/* <RTLLayout> */}
          <AlertQueue>
            <NavigationScroll>
              <GraphqlProvider>
                <>
                  <Routes />
                  <Snackbar />
                  <ConfirmDialog />
                </>
              </GraphqlProvider>
            </NavigationScroll>
          </AlertQueue>
          {/* </RTLLayout> */}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
