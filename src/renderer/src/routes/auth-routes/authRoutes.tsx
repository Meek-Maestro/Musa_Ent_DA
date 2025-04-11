import { Box, LoadingOverlay } from '@mantine/core';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { observer } from 'mobx-react';
import authroutes from "../../modules/auth-module/pages/authRootRoute"
import { settingsRespository } from '@renderer/store/dexi/user.settings';
// const modals = {};

export const AppAuthRoutes = observer(() => {
  // settingsRespository.clearBaseUrl()
  return (
    <Box>
      <HashRouter basename="/">
        <Suspense fallback={<LoadingOverlay visible></LoadingOverlay>}>
          <Routes>
            <Route path="">
              {authroutes}
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </Box>
  );
});

// declare module '@mantine/modals' {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// }
