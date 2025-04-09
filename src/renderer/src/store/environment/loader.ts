import { showNotification } from "@mantine/notifications";
import { makeAutoObservable } from "mobx";
import { createElement } from "react";
import { MdClose } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { accounting } from "../admin/accounting";
import { backupSummary } from "../admin/backups";
import { categoriesStore } from "../admin/categories";
import { customerStore } from "../admin/customers";
import { expenseStore } from "../admin/expenses";
import { products } from "../admin/products";
import { purchaseStore } from "../admin/purchase";
import { ProductStore } from "../admin/stores";
import { SupplierStore } from "../admin/suppliers";
import { userStore } from "../admin/users";
import { recentSalesSummary } from "../recent_sales";
import { storeSummary } from "../summary";
import { reportsLoader } from "../admin/reports";


class EnvironmentLoader {
  constructor() {
    makeAutoObservable(this)
  }

  async loadBusinessResources() {
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
      storeSummary.loadSummary(),
      userStore.loadusers(),
      customerStore.loadCustomers(),
      SupplierStore.loadSuppliers(),
      ProductStore.loadStores(),
      ProductStore.loadStockReports(),
      products.loadProducts(),
      categoriesStore.loadCategories(),
      purchaseStore.loadPurchases(),
      recentSalesSummary.loadRecentSales(),
      expenseStore.loadExpenses(),
      backupSummary.loadSummary(),
      accounting.loadCustomerAccounting(),
      accounting.loadSupplierAccounting(),
      reportsLoader.loadPOS(),
      reportsLoader.loadPurchases(),
      reportsLoader.loadStore({ name: "" }),
      reportsLoader.loadCustomerAccounting(),
      reportsLoader.loadSuppliersAccounting(),
      reportsLoader.loadCustomers(),
      reportsLoader.loadSuppliers(),
      reportsLoader.loadExpenses()
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
}

export const environmentLoader = new EnvironmentLoader()