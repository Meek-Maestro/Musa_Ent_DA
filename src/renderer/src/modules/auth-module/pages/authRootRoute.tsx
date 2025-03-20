import React, { lazy } from "react";
import { Route, } from "react-router-dom";
const LazyLogin = lazy(() => import("./AuthLoginPage"))
const LazySignUp = lazy(()=> import("./AuthSignUpPage"))

export default (
    <React.Fragment>
        <Route path="/"
            element={
                <LazyLogin />
            } />
        <Route path="/signup"
            element={
                <LazySignUp />
            } />
            
    </React.Fragment>
)