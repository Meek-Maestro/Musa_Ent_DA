import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";

import { useState } from "react";
import { MdOutlineDashboard, MdAttachMoney, MdInventory, MdPeople, MdStore } from "react-icons/md";
import Overview from "../../components/report/overview";

const Reports = () => {
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
                    <Text>Financial Report</Text>
                </Group>
            ),
            value: "finance",
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
                   
                />
            </Group>

            {/* Render content based on active tab */}
            <Box>
                {activeTab === "overview" && <Overview />}
                {activeTab === "finance" && <Text>Financial Report Content</Text>}
                {activeTab === "inventory" && <Text>Inventory Report Content</Text>}
                {activeTab === "customer" && <Text>Customer Report Content</Text>}
                {activeTab === "store" && <Text>Store Report Content</Text>}
            </Box>
        </AppPageWrapper>
    );
};

export default Reports;