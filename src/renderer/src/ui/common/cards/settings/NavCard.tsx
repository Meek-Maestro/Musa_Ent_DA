import { Group, Paper, Radio, ScrollArea, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { observer } from "mobx-react";
import classes from "./index.module.css"
import { RiUserLine } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { MdDataset, MdNotifications, MdSettings, MdStore } from "react-icons/md";

interface cards {
    title: string;
    icon: IconType
}

interface props {
    onSelect: (data: string) => void
    selected?: string | null
}

const NavCard = observer(({ onSelect, selected }: props) => {
    const theme = useMantineTheme()
    const data: cards[] = [
        {
            title: "User",
            icon: RiUserLine
        },
        {
            title: "Inventory",
            icon: MdSettings
        },
        {
            title: "Notification",
            icon: MdNotifications
        },
        {
            title: "Data",
            icon: MdDataset
        },
        {
            title: "Store",
            icon: MdStore
        },
    ]
    const NavCards = data.map((Data, index) => (
        <Paper  shadow="md" onClick={() => onSelect(Data.title)} p={`lg`} key={index} className={`${classes.card} ${selected === Data.title ? classes.selectedCard : ""}`} withBorder>
            <Group justify="space-between">
                <Stack gap={0}>
                    <Text fw={`bold`} size="md"> {Data.title}</Text>
                    <Text fw={`bold`} size="md">Management</Text>
                </Stack>
                <Data.icon size={40} />
            </Group>
        </Paper>
    ))
    return (
        <>
            <Group justify="center" h={`max-content`} grow bg={`white`} p={`md`} style={{ borderRadius: "10px" }}>
                {NavCards}
            </Group>
        </>
    )
})

export default NavCard