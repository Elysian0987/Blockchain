import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// thirdweb
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { PolygonAmoyTestnet } from '@thirdweb-dev/chains';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <ThirdwebProvider activeChain={PolygonAmoyTestnet} clientId="700344b43a6642667fc8f4aafb37096f">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <RouterProvider router={router} />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </ThirdwebProvider>
  );
};

export default App;