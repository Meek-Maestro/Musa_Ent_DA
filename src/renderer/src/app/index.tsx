import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { mantineTheme } from "../config/mantine";
import { AppRoutes } from "../routes/AppRoutes"; 
import { AppAuthRoutes } from "../routes/auth-routes/authRoutes";
import { Notifications } from "@mantine/notifications";
import { authManager } from "../store/auth";
import BaseURLModal from "@renderer/ui/templates/BaseUrl";

export default observer(function Main() {
    useEffect(() => {
        authManager.init()
        console.log(authManager.status)
    }, [])
    // authManager.logout()
    return (
        <React.Fragment>
            <MantineProvider theme={mantineTheme} defaultColorScheme="light" forceColorScheme="light">
                <Notifications />
                <BaseURLModal/>
                <App />
            </MantineProvider>
        </React.Fragment>
    )
})

const App = observer(() => {
    if (authManager.status == "authenticated") {
        return <AppRoutes />
    }
    if (authManager.status == "initial") {
        return <LoadingOverlay visible></LoadingOverlay>
    }
    if (authManager.status == "loaded") {
        return <AppAuthRoutes />
    }

    return <LoadingOverlay visible></LoadingOverlay>
}) 