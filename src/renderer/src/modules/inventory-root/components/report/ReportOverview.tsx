import { Badge, Grid, Group, Paper, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiSolidPurchaseTag, BiTransfer } from "react-icons/bi";
import { SiExpensify } from "react-icons/si";
import { MdBackup, MdCategory, MdPerson } from "react-icons/md";
import { observer } from "mobx-react";
import { IconType } from "react-icons";
import { GiBackup } from "react-icons/gi";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { FaStore } from "react-icons/fa6";
import { reportsLoader } from "@renderer/store/admin/reports";

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
            title: "Customer",
            icon: GiBackup,
            state: "customer"
        },
        {
            title: "Customer Accounting",
            icon: GiBackup,
            state: "customer_accounting"
        },
        {
            title: "Supplier",
            icon: MdPerson,
            state: "supplier"
        },
        {
            title: "Supplier Accounting",
            icon: MdPerson,
            state: "supplier_accounting"
        },
        {
            title: "Expense",
            icon: SiExpensify,
            state: "expense"
        },
        // {
        //     title: "Backup",
        //     icon: MdBackup,
        //     state: "backup"
        // },
        {
            title: "Store Transfer",
            icon: BiTransfer,
            state: "store_transfer"
        },
        // {
        //     title: "Customer Report",
        //     icon: AiTwotoneCustomerService,
        //     state: "customer_report"
        // },
        // {
        //     title: "Categories",
        //     icon: MdCategory,
        //     state: "categories"
        // },
        {
            title: "Store",
            icon: FaStore,
            state: "store"
        },
    ]

    const renderDynamicBadges = (data: cards) => (
        <>
            {data.state === "pos" && (
                <Group>
                    <Badge bg={theme.colors.gray[4]} p={`sm`}>
                        Sold: +{reportsLoader.Pos_reports.products_sold}
                    </Badge>
                </Group>
            )}
        </>
    )
    return (
        <>
            <Grid>
                {over_view_data.map((data, index) => (
                    <Grid.Col span={4}>
                        <Paper withBorder shadow="sm" h={120}>
                            <UnstyledButton w={`100%`}
                                key={index} p="xl"
                                display={`grid`}
                                style={{
                                    alignItems: "center", gap: 10, "&hover": {
                                        backgroundColor: theme.colors.blue[2],
                                        cursor: "pointer"
                                    }
                                }} onClick={() => onselect?.(data.state)}>
                               
                                <Group>
                                    {data.icon && <data.icon size={30} color={theme.colors.gray[9]} />}
                                    <Text size="md" fw={600}>{data.title}</Text>
                                    {data.state === "pos" && (
                                    <>
                                        <Badge ml={`auto`} bg={theme.colors.green[2]} p={`sm`}>
                                            <Text size="sm" c={theme.colors.green[7]}>+%{reportsLoader.Pos_reports.profit_margin}</Text>
                                        </Badge>
                                    </>
                                )}
                                </Group>
                                {renderDynamicBadges(data)}
                            </UnstyledButton>
                        </Paper>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
})
