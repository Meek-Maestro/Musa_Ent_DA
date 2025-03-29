import { Box, LoadingOverlay } from '@mantine/core';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react';
import { InverntoryAppShell } from '../modules/inventory-root/components/InventoryAppShell';
import InventoryRootRoutes from '../modules/inventory-root/InventoryRootRoutes';
import { ModalsProvider } from '@mantine/modals';
import AddProductModal from '../ui/common/modals/add-products/addProducts';
import AddStoreModal from '../ui/common/modals/add-store/Add-Store';
import AddCustomer from '../ui/common/modals/add-customers/AddCustomer';
import AddSupplier from '../ui/common/modals/add-supplier/AddSupplier';
import EditCustomer from '../ui/common/modals/edit-customer/EditCustomer';
import EditSupplier from '../ui/common/modals/edit-supplier/EditSupplier';
import AddUser from '../ui/common/modals/add-user/AddUser';
import Edituser from '../ui/common/modals/edit-user/EditUser';
import AddCategories from '../ui/common/modals/add-categories/AddCategories';
import EditStoreModal from '../ui/common/modals/edit-store/EditStore';
import EditProductModal from '../ui/common/modals/edit-product/EditProduct';
import AddPurchase from '../modules/inventory-root/pages/expenses/purchases/AddPurchases';
import EditCategory from '@renderer/ui/common/modals/edit-category/EditCategory';
import { authManager } from '@renderer/store/auth';
import { environmentLoader } from '@renderer/store/environment/loader';
import AddCustomer_A from '@renderer/ui/common/modals/add-customer_A/AddCustomers_A';
import EditCustomer_A from '@renderer/ui/common/modals/edit-customers_A/EditCustomers_A';

export const AppRoutes = observer(() => {
  useEffect(() => {
    const loginTimestampKey = 'loginTimestamp';
    const logoutAfterMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check if the user is logged in and the session is still valid
    const checkSession = () => {
      const loginTimestamp = localStorage.getItem(loginTimestampKey);
      if (loginTimestamp) {
        const elapsedTime = Date.now() - parseInt(loginTimestamp, 10);
        if (elapsedTime > logoutAfterMs) {
          // Log the user out
          localStorage.removeItem(loginTimestampKey);
          // Perform logout logic here
          console.log('Session expired. Logging out...');
          authManager.logout()
        }
      }
    };

    // Set the login timestamp if not already set
    if (!localStorage.getItem(loginTimestampKey)) {
      localStorage.setItem(loginTimestampKey, Date.now().toString());
    }

    // Check session on component mount
    checkSession();

    // Optionally, set an interval to check periodically
    const intervalId = setInterval(checkSession, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);


  useEffect(() => {
    environmentLoader.loadBusinessResources()
  }, []);


  const modals = {
    render_addProduct: AddProductModal,
    render_editProduct: (props: any) => <EditProductModal {...props} />,
    render_addStore: AddStoreModal,
    render_addCustomers: AddCustomer,
    render_addSupplier: AddSupplier,
    render_addUser: AddUser,
    render_editCustomer: (props: any) => <EditCustomer {...props} />,
    render_editSupplier: (props: any) => <EditSupplier {...props} />,
    render_editUser: (props: any) => <Edituser {...props} />,
    render_addCategory: AddCategories,
    render_editStore: (props: any) => <EditStoreModal {...props} />,
    render_addPurchase: AddPurchase,
    render_editCategory: (props: any) => <EditCategory {...props} />,
    render_addCustomer_A: AddCustomer_A,
    render_editCustomer_A: (props: any) => <EditCustomer_A {...props} />
  }
  // authManager.logout()

  return (
    <Box>
      <HashRouter basename='/'>
        <ModalsProvider modals={modals}>
          <Suspense fallback={<LoadingOverlay visible></LoadingOverlay>}>
            <Routes>
              <Route path="" Component={InverntoryAppShell}>
                {InventoryRootRoutes}
              </Route>
            </Routes>
          </Suspense>
        </ModalsProvider>
      </HashRouter>
    </Box>
  );
});

// declare module '@mantine/modals' {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// }
