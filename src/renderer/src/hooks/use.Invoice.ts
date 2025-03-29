import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api";
import RecentSales from "@renderer/modules/inventory-root/components/pos/RecentSales";
import { authManager } from "@renderer/store/auth";
import { recentSalesSummary } from "@renderer/store/recent_sales";
import { useState } from "react";

interface IProduct {
    cost: number;
    discount: number;
    quantity: number;
    description: string;
    product_name: string;
}

interface IInvoice {
    store: number;
    customer:number
    note: string;
    products: IProduct[];
    printed: boolean;
}
export function useInvoice() {
    const invoice_form = useForm<IInvoice>()
    const [submiting, setSubmiting] = useState(false)


    async function createInvoice(): Promise<boolean> {
        const { access_token } = authManager.profile
        setSubmiting(true)
        try {
            await api.post("api/v1/pos/", invoice_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSubmiting(false)
            await recentSalesSummary.loadRecentSales()
            return true
        } catch (error) {
            console.log(error)
            setSubmiting(false)
            return false
        } finally {
            setSubmiting(false)
        }
    }


    return {
        invoice_form,
        submiting,
        createInvoice
    }
}