import { Box, LoadingOverlay } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate, HashRouter, MemoryRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react';
import authroutes from "../../modules/auth-module/pages/authRootRoute"
// const modals = {};

export const AppAuthRoutes = observer(() => {

  return (
    <Box>
      <BrowserRouter basename="">
        <Suspense fallback={<LoadingOverlay visible></LoadingOverlay>}>
          <Routes>
            <Route path="" >
              {authroutes}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Box>
  );
});

// declare module '@mantine/modals' {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// }
