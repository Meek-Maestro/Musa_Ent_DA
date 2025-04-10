import { LinksGroupProps } from '../../../interface';
import { MdDashboard, MdHelp, MdLogout, MdReport, MdSettings, MdShoppingCart, MdStore } from 'react-icons/md';
import {TbReportAnalytics} from "react-icons/tb"
import { BiPurchaseTag } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
import { AiOutlineAccountBook } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";

export const InventoryPaths: LinksGroupProps[] = [
    {
        title: "Discovery",
        items: [
            { 
                label: "Dashboard", 
                link: "/", 
                icon: MdDashboard, 
                // links: [
                //     { label: "Reports", link: "/dashboard/reports" } 
                // ] 
            },
            { label: "Stores", link: "/store", icon: MdStore }
        ]
    },
    {
        title: "Inventory",
        items: [
            { label: "Products", link: "/products", icon: MdShoppingCart },
            { label: "Suppliers/Customers", link: "/suppliers-customers", icon:  RiSurveyLine},
            { label: "Reports", link: "/reports", icon: TbReportAnalytics },
            { label: "Purchase", link: "/purchase", icon: BiPurchaseTag },
            { label: "Accounting", link: "/accounting", icon: AiOutlineAccountBook },
            { label: "Expenses", link: "/expenses", icon: MdOutlinePayments }
        ]
    },
    {
        title:"Settings",
        items:[
            { label: "Settings", link: "/settings", icon: MdSettings },
            // { label: "Help", link: "/", icon: MdHelp },
        ]
    }
];
