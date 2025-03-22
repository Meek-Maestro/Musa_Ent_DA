import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api";
import { authManager } from "@renderer/store/auth";
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
    customer_fullname: string;
    customer_phone: string;
    customer_address: string;
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