import { Grid, Paper, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiSolidPurchaseTag, BiTransfer } from "react-icons/bi";
import { SiExpensify } from "react-icons/si";
import { MdBackup, MdCategory, MdPerson } from "react-icons/md";
import { observer } from "mobx-react";
import { IconType } from "react-icons";
import { GiBackup } from "react-icons/gi";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { FaStore } from "react-icons/fa6";

interface cards {
    title: string,
    icon?: IconType
    caption?: string
    state: string
}
interface cardProps {
    onselect: (selected: string) => void
}
export default observer(function OverView({ onselect }: cardProps) {
    const theme = useMantineTheme()
    const over_view_data: cards[] = [
        {
            title: "POS",
            icon: TbCurrencyNaira,
            state: "pos"
        },
        {
            title: "Purchase",
            icon: BiSolidPurchaseTag,
            state: "purchase"
        },
        {
            title: "Customer Account",
            icon: GiBackup,
            state: "customer"
        },
        {
            title: "Supplier",
            icon: MdPerson,
            state: "supplier"
        },
        {
            title: "Expense",
            icon: SiExpensify,
            state: "expense"
        },
        {
            title: "Backup",
            icon: MdBackup,
            state: "backup"
        },
        {
            title: "Store Transfer",
            icon: BiTransfer,
            state: "store_transfer"
        },
        {
            title: "Customer Report",
            icon: AiTwotoneCustomerService,
            state: "customer_report"
        },
        {
            title: "Categories",
            icon: MdCategory,
            state: "categories"
        },
        {
            title: "Store",
            icon: FaStore,
            state: "store"
        },
    ]
    return (
        <>
            <Grid>
                {over_view_data.map((data, index) => (
                    <Grid.Col span={4}>
                        <Paper withBorder shadow="sm">
                            <UnstyledButton w={`100%`}
                                bg={theme.colors.gray[3]} key={index} p="xl"
                                display={`flex`}
                                style={{
                                    alignItems: "center", gap: 10, "&hover": {
                                        backgroundColor: theme.colors.blue[2],
                                        cursor: "pointer"
                                    }
                                }} onClick={() => onselect?.(data.state)}>
                                {data.icon && <data.icon size={30} color={theme.colors.gray[9]} />}
                                <Text size="md" fw={600}>{data.title}</Text>
                            </UnstyledButton>
                        </Paper>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
})