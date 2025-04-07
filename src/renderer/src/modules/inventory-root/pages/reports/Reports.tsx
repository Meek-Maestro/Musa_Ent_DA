import { Box,Text, useMantineTheme } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import { useEffect, useState } from "react";
import ReportOverview from "../../components/report/ReportOverview";
import { reportsLoader } from "@renderer/store/admin/reports";
import Financial from "../../components/report/Financial";
import Purchase from "../../components/report/Purchase";
import Store from "../../components/report/Store";


const Reports = () => {
    const theme = useMantineTheme()
    const [posReport, setPosReport] = useState<any>({})
    useEffect(() => {
        setPosReport(reportsLoader.Pos_reports || {})
    }, [reportsLoader.Pos_reports])

    const [activeTab, setActiveTab] = useState<any>("overview");

    const handleBack = () => {
        setActiveTab("overview")
    }

    return (
        <AppPageWrapper title={"Reports"} right={<UserButton />}>
          
            {/* Render content based on active tab */}
            <Box>
                {activeTab == "overview" && <ReportOverview onselect={setActiveTab} />}
                {activeTab === "pos" && <Financial close={handleBack} />}
                {activeTab === "purchase" && <Purchase close={handleBack}/>}
                {activeTab === "store" && <Store close={handleBack}/>}
                {activeTab === "customer" && <Text>Customer Report Content</Text>}
                
            </Box>
        </AppPageWrapper>
    );
};

export default Reports;