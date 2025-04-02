import { Box, Button, Divider, Group, Input, SegmentedControl, Select, Text, TextInput, useMantineTheme } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";

import { useEffect, useState } from "react";
import { MdOutlineDashboard, MdAttachMoney, MdInventory, MdPeople, MdStore } from "react-icons/md";
import ReportOverview from "../../components/report/ReportOverview";
import { reportsLoader } from "@renderer/store/admin/reports";
import Financial from "../../components/report/Financial";

const Reports = () => {
    const { start_date, end_date } = reportsLoader

    const theme = useMantineTheme()
    const [posReport, setPosReport] = useState<any>({})
    useEffect(() => {
        setPosReport(reportsLoader.Pos_reports || {})
    }, [reportsLoader.Pos_reports])

    const tabs = [
        {
            label: (
                <Group>
                    <MdOutlineDashboard size={16} />
                    <Text>Overview</Text>
                </Group>
            ),
            value: "overview",
        },
        {
            label: (
                <Group>
                    <MdAttachMoney size={16} />
                    <Text>Sales & Transaction</Text>
                </Group>
            ),
            value: "pos",
        },
        {
            label: (
                <Group>
                    <MdInventory size={16} />
                    <Text>Inventory Report</Text>
                </Group>
            ),
            value: "inventory",
        },
        {
            label: (
                <Group>
                    <MdPeople size={16} />
                    <Text>Customer Report</Text>
                </Group>
            ),
            value: "customer",
        },
        {
            label: (
                <Group>
                    <MdStore size={16} />
                    <Text>Store Report</Text>
                </Group>
            ),
            value: "store",
        },
    ];

    const [activeTab, setActiveTab] = useState("overview");

    const QueryTabs = () => (
        <>
            <Group gap={`sm`} align="center">
                <Select
                    defaultValue={"today".toUpperCase()}
                    data={["today".toUpperCase(),
                    "this_week".toLocaleUpperCase().replace("_", ' '),
                    "this_month".toUpperCase().replace("_", ' '),
                    "week".toUpperCase(), "full".toUpperCase()]} variant="filled" styles={{
                        input: {
                            border: `1px solid ${theme.colors.gray[2]}`,
                            borderRadius: 0,
                            background: theme.colors.blue[6],
                            fontWeight: 600,
                            color: "white"
                        }
                    }} label="Period" />
                <TextInput defaultValue={start_date} variant="filled" styles={{
                    input: {
                        border: `1px solid ${theme.colors.gray[2]}`,
                        borderRadius: 0,
                        background: theme.colors.blue[6],
                        fontWeight: 600,
                        color: "white"
                    }
                }} type="date" label="Start Date" />
                <TextInput defaultValue={end_date} variant="filled" styles={{
                    input: {
                        border: `1px solid ${theme.colors.gray[2]}`,
                        borderRadius: 0,
                        background: theme.colors.blue[6],
                        fontWeight: 600,
                        color: "white"
                    }
                }} type="date" label="End Date" />

                <Button variant="subtle" mt={`lg`}>Generate</Button>
            </Group>
        </>
    )

    return (
        <AppPageWrapper title={"Reports"} right={<UserButton />}>
            {/* Tabs as SegmentedControl */}
            <Group justify="center" mb="md">
                <SegmentedControl
                    w={`100vw`}
                    value={activeTab}
                    onChange={setActiveTab}
                    data={tabs}
                    fullWidth
                    size="md"
                    bg={`white`}
                    style={{ borderBottom: `2px solid ${theme.colors.gray[3]}` }}
                    styles={{
                        indicator: {
                            backgroundColor: theme.colors.blue[2],
                        },
                        innerLabel: {
                            fontSize: "58px"
                        }
                    }}
                />
            </Group>
            {/* Render content based on active tab */}
            <Box>
                {activeTab === "overview" && <ReportOverview />}
                {activeTab === "pos" && <Financial />}
                {activeTab === "inventory" && <Text>Inventory Report Content</Text>}
                {activeTab === "customer" && <Text>Customer Report Content</Text>}
                {activeTab === "store" && <Text>Store Report Content</Text>}
            </Box>
        </AppPageWrapper>
    );
};

export default Reports;