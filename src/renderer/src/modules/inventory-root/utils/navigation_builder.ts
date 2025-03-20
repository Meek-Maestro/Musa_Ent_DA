import { LinksGroupProps } from '../../../interface';
import { MdDashboard, MdHelp, MdLogout, MdReport, MdSettings, MdShoppingCart, MdStore } from 'react-icons/md';
import { RiSurveyLine } from "react-icons/ri";
import { GiExpense } from "react-icons/gi";
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
            { label: "Reports", link: "/reports", icon: MdReport },
            { label: "Expenses", link: "/expenses", icon: GiExpense },
            { label: "Accounting", link: "/accounting", icon: AiOutlineAccountBook },
            { label: "Payments", link: "/payments", icon: MdOutlinePayments }
        ]
    },
    {
        title:"Settings",
        items:[
            { label: "Settings", link: "/settings", icon: MdSettings },
            { label: "Help", link: "/", icon: MdHelp },
        ]
    }
];
