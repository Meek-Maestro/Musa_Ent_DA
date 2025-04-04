import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api";
import RecentSales from "@renderer/modules/inventory-root/components/pos/RecentSales";
import { reportsLoader } from "@renderer/store/admin/reports";
import { authManager } from "@renderer/store/auth";
import { cartController } from "@renderer/store/cart";
import { recentSalesSummary } from "@renderer/store/recent_sales";
import { useState } from "react";

interface IProduct {
    product: string;
    quantity: number;
    subtotal: number
    discount: number;
}

interface IInvoice {
    customer: number
    note: string;
    products: IProduct[];
    payment_method: string
    printed: boolean;
    store: number
}
export function useInvoice() {
    const invoice_form = useForm<IInvoice>()
    const [submiting, setSubmiting] = useState(false)


    async function createInvoice(): Promise<boolean> {
        
        const { access_token } = authManager.profile
        setSubmiting(true)
        try {
            await api.post("api/v1/pos/", cartController.getValues(), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSubmiting(false)
            await recentSalesSummary.loadRecentSales()
            await reportsLoader.loadPOS()
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