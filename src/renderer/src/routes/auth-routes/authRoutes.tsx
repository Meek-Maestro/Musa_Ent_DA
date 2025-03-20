import { Box, LoadingOverlay } from '@mantine/core';
import { Routes, Route, HashRouter, MemoryRouter, } from 'react-router-dom';
import { Suspense } from 'react';
import { observer } from 'mobx-react';
import authroutes from "../../modules/auth-module/pages/authRootRoute"
// const modals = {};

export const AppAuthRoutes = observer(() => {

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
