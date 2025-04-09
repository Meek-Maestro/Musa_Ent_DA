import { Box,Text, useMantineTheme } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import { useEffect, useState } from "react";
import ReportOverview from "../../components/report/ReportOverview";
import { reportsLoader } from "@renderer/store/admin/reports";
import Financial from "../../components/report/Financial";
import Purchase from "../../components/report/Purchase";
import Store from "../../components/report/Store";
import CustomerAccounting from "../../components/report/CustomerAccounting";
import SupplierAccounting from "../../components/report/SupplierAccounting";
import Customer from "../../components/report/Customer";
import Suppliers from "../../components/report/Suppliers";
import Expenses from "../../components/report/Expenses";
import StoreTransfer from "../../components/report/StoreTransfer";


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
                {activeTab === "customer_accounting" && <CustomerAccounting close={handleBack}/>}
                {activeTab === "supplier_accounting" && <SupplierAccounting close={handleBack}/>}
                {activeTab === "customer" && <Customer close={handleBack}/>}
                {activeTab === "supplier" && <Suppliers close={handleBack}/>}
                {activeTab === "expense" && <Expenses close={handleBack}/>}
                {activeTab === "store_transfer" && <StoreTransfer close={handleBack}/>}
                
            </Box>
        </AppPageWrapper>
    );
};

export default Reports;