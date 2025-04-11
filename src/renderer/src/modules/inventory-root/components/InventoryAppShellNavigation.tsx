import { AppShell, Box, Group, Stack, Text, Image } from "@mantine/core";
import { observer } from "mobx-react";
import { NavbarNested } from "../../../ui/organisms/navbar-nested/NavbarNested";
import { InventoryPaths } from "../utils/navigation_builder";
import { logoImg } from "../../../assets";
import { authManager } from "@renderer/store/auth";

export const InverntoryAppShellNavigation = observer(() => {
    const {business_name} = authManager.profile
    return (
        <AppShell.Navbar>
            <NavbarNested links={InventoryPaths} header={<Group>
                <Image src={logoImg}
                    style={{
                        width: "30%", objectFit: "contain",
                        mixBlendMode: "hard-light",
                        clipPath: "circle(50% at 50% 50%)"
                    }}
                />
                <Stack gap={0}>
                    <Text fw={`bold`} c={`white`} size="md"></Text>
                    <Text c={`white`} size="sm"></Text>
                </Stack>
            </Group>}
            />
        </AppShell.Navbar>
    )
})