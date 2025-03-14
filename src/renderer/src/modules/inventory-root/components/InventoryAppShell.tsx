import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InverntoryAppShellHeader } from "./InventoryAppShellHeader";
import { InverntoryAppShellNavigation } from "./InventoryAppShellNavigation";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { routerUtilsManager } from "../../../store/router_utils";

export function InverntoryAppShell() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const theme = useMantineTheme()
    useEffect(() => {
        routerUtilsManager.toggleMainDrawerFunc(toggleMobile);
      }, []);
    return (
        <AppShell
            withBorder={false}
            bg={theme.colors.gray[1]}
            styles={{  root: { overflow: 'hidden' } }}
            navbar={{
                width: 270,
                breakpoint: 'md',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            footer={{ height: 0 }}
        >

            {/* <InverntoryAppShellHeader
                mobileOpened={mobileOpened}
                toggle={toggleMobile}
                desktopOpened={desktopOpened}
                desktopToggle={toggleDesktop}
            /> */}
            <InverntoryAppShellNavigation />
            <AppShell.Main >
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}