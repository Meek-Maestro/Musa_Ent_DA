import { AppShell, Burger, Group } from "@mantine/core";
import { observer } from "mobx-react";

export const InverntoryAppShellHeader = observer((
    {
        toggle,
        mobileOpened,
    }: {
        toggle: () => void;
        mobileOpened: boolean;
        desktopToggle: () => void;
        desktopOpened: boolean;
    }
) => {
    return (
        <AppShell.Header>
            <Group hiddenFrom="md" px="lg">
                <Burger hiddenFrom="md" opened={mobileOpened} onClick={toggle} />

                {/* <img src={logo} height={28} /> */}

            </Group>
        </AppShell.Header>
    )
})