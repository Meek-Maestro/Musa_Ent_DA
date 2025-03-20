import { Box, LoadingOverlay } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate, HashRouter, MemoryRouter, useNavigate } from 'react-router-dom';
import { createElement, Suspense, useEffect } from 'react';
import { observer } from 'mobx-react';
import { InverntoryAppShell } from '../modules/inventory-root/components/InventoryAppShell';
import InventoryRootRoutes from '../modules/inventory-root/InventoryRootRoutes';
import { ModalsProvider } from '@mantine/modals';
import AddProductModal from '../ui/common/modals/add-products/addProducts';
import { userStore } from '../store/admin/users';
import AddStoreModal from '../ui/common/modals/add-store/Add-Store';
import AddCustomer from '../ui/common/modals/add-customers/AddCustomer';
import AddSupplier from '../ui/common/modals/add-supplier/AddSupplier';
import { customerStore } from '../store/admin/customers';
import EditCustomer from '../ui/common/modals/edit-customer/EditCustomer';
import { SupplierStore } from '../store/admin/suppliers';
import EditSupplier from '../ui/common/modals/edit-supplier/EditSupplier';
import { ProductStore } from '../store/admin/stores';
import AddUser from '../ui/common/modals/add-user/AddUser';
import Edituser from '../ui/common/modals/edit-user/EditUser';
import { products } from '../store/admin/products';
import { categoriesStore } from '../store/admin/categories';
import AddCategories from '../ui/common/modals/add-categories/AddCategories';
import EditStoreModal from '../ui/common/modals/edit-store/EditStore';
import EditProductModal from '../ui/common/modals/edit-product/EditProduct';
import AddPurchase from '../modules/inventory-root/pages/expenses/purchases/AddPurchases';
import { purchaseStore } from '../store/admin/purchase';
import { showNotification } from '@mantine/notifications';
import { TiTickOutline } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import EditCategory from '@renderer/ui/common/modals/edit-category/EditCategory';
import { authManager } from '@renderer/store/auth';
// import { ModalsProvider } from '@mantine/modals';

// const modals = {};

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
    async function load(){
      showNotification({
        title: "Musa Enterprise",
        message: "Loading Resources in the background",
        color: "green",
        position: "top-center",
        style: { backgroundColor: "rgb(240, 253, 244)", padding: "20px" },
        icon: createElement(TiTickOutline, { size: 20, color: 'rgb(240, 253, 244)' }),
        styles: {
          description: { color: "#276749", fontWeight: 500 },
          title: { color: "#276749", fontWeight: 600 },
        }
      });
    
      await Promise.all([
        userStore.loadusers(),
        customerStore.loadCustomers(),
        SupplierStore.loadSuppliers(),
        ProductStore.loadStores(),
        ProductStore.loadStockReports(),
        products.loadProducts(),
        categoriesStore.loadCategories(),
        purchaseStore.loadPurchases()
      ])
        .then(() => showNotification({
          title: "Musa Enterprise",
          message: "Resources Loaded successfully",
          color: "green",
          position: "top-center",
          style: { backgroundColor: "rgb(240, 253, 244)", padding: "20px" },
          icon: createElement(TiTickOutline, { size: 20, color: 'rgb(240, 253, 244)' }),
          styles: {
            description: { color: "#276749", fontWeight: 500 },
            title: { color: "#276749", fontWeight: 600 },
          }
        }))
        .catch(error => {
          console.error("Resource Loading Error:", error);
          showNotification({
            title: "Error",
            message: error.response?.data?.message || error?.message || "Failed to load resources",
            color: "red",
            position: "top-center",
            style: { backgroundColor: "rgb(254, 242, 242)", padding: "20px" },
            icon: createElement(MdClose, { size: 35, color: 'white' }),
            styles: {
              description: { color: "#FF0000", fontWeight: 500 },
              title: { color: "#FF0000", fontWeight: 600 },
            }
          });
        });
    }
    load()
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
    render_editCategory: (props:any)=> <EditCategory {...props}/>
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
