import { Box } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import NavCard from "../../../../ui/common/cards/settings/NavCard"
import { ReactNode, useState } from "react"
import UserManagement from "../../components/settings/UserManagement"
import StoreManagement from "../../components/settings/StoreManagement"
import Inventory from "../../components/settings/Inventory"
import DataManagement from "../../components/settings/DataManagement"
import React from "react"

const Settings = () => {
    const [selected, setSelected] = useState<string | null>("User")

    let selectedComponent: ReactNode
    switch (selected) {
        case "User":
            selectedComponent = <UserManagement />
            break
        case "Store":
            selectedComponent = <StoreManagement />
            break
        case "Inventory":
            selectedComponent = <Inventory />
            break
        case "Data":
            selectedComponent = <DataManagement />
            break
        default:
            selectedComponent = null
    }

    console.log(selected)
    return (
        <>
            <AppPageWrapper title="Settings" right={<UserButton />}>
                <Box>
                    <NavCard onSelect={setSelected} selected={selected} />
                </Box>
                <React.Fragment>
                    {selectedComponent}
                </React.Fragment>
            </AppPageWrapper>
        </>

    )
}

export default Settings