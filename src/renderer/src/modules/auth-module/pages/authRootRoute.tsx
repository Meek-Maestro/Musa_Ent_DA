import React, { lazy } from "react";
import { Navigate, Route, } from "react-router-dom";
const LazyLogin = lazy(() => import("./AuthLoginPage"))
const LazySignUp = lazy(()=> import("./AuthSignUpPage"))

export default (
    <React.Fragment>
        <Route path="/login"
            element={
                <LazyLogin />
            } />
        <Route path="/signup"
            element={
                <LazySignUp />
            } />

            <Route path="*"
            element={<Navigate to={`/login`}/>}
            />
            <Route path="/"
            element={<Navigate to={`/login`}/>}
            />
    </React.Fragment>
)