import React, { lazy } from "react";
import { Navigate, Route, } from "react-router-dom";
const LazyDashBoard = lazy(() => import("./pages/dashboard/Dashboard"))
const LazyPOS = lazy(() => import("./pages/pos/Pos"))
const LazySuppliers = lazy(() => import("./pages/suppliers-customers/Suppliers&Customers"))
const LazyProducts = lazy(() => import("./pages/products/products"))
const LazyStores = lazy(() => import("./pages/stores/Stores"))
const LazySettings = lazy(() => import("./pages/settings/Settings"))
const LazyAccounting = lazy(() => import("./pages/accounting/Accounting"))
const LazyExpenses = lazy(() => import("./pages/expenses/Expenses"))
const LazyReports = lazy(() => import("./pages/reports/Reports"))
const LazyPayments = lazy(() => import("./pages/payments/Payments"))
const LazyPurchases = lazy(() => import("./pages/expenses/purchases/AddPurchases"))
const LazyViewPurchase = lazy(() => import("./pages/expenses/purchases/ViewPurchases"))
const LazyEditPurchase = lazy(() => import("./pages/expenses/purchases/EditPurchase"))
const LazyDamagedProducts = lazy(() => import("./pages/expenses/purchases/DamagedProducts"))
export default (
    <React.Fragment>
        <Route path="/"
            element={
                <LazyDashBoard />
            } />
        <Route path="/pos"
            element={
                <LazyPOS />
            } />
        <Route path="/suppliers-customers"
            element={
                <LazySuppliers />
            } />
        <Route path="/products"
            element={
                <LazyProducts />
            } />
        <Route path="/store"
            element={
                <LazyStores />
            } />
        <Route path="/settings"
            element={
                <LazySettings />
            } />
        <Route path="/view-purchase/:id" element={<LazyViewPurchase />} />
        <Route path="/edit-purchase/:id" element={<LazyEditPurchase />} />
        <Route path="/damaged-goods" element={<LazyDamagedProducts />} />
        <Route path="/accounting" element={<LazyAccounting />} />
        <Route path="/expenses" element={<LazyExpenses />} />
        <Route path="/purchases" element={<LazyPurchases />} />
        <Route path="/reports" element={<LazyReports />} />
        <Route path="/payments" element={<LazyPayments />} />
        <Route path="*" element={<Navigate to={`/`} />} />
    </React.Fragment>
)