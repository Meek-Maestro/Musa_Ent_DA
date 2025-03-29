import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { api } from "../../api/api"
import { useForm } from "@mantine/form"
import { Customers, CustomersAccounting } from "../../interface"
import { authManager } from "../../store/auth"
import { customerStore } from "../../store/admin/customers"
import { accounting } from "@renderer/store/admin/accounting"

interface IformInput {
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "customer": number,
    "amount_paid": number,
    "received_by": string
}

export function useCustomerA_Operations() {
    const { access_token } = authManager.profile

    const [submiting, setSubmiting] = useState(false)
    const customer_form = useForm<IformInput>(
        {
            initialValues: {
                "payment_date": "",
                "payment_method": "",
                "memo": "",
                "customer": 0,
                "amount_paid": 0,
                "received_by": ""
            },
            validate: {
                "payment_date": (value) => value ? null : "Select Date",
                "payment_method": (value) => value ? null : "Select Payment Method",
                "customer": (value) => value ? null : "Please select a customer",
                "amount_paid": (value) => value ? null : "Enter Amount Payed",
                // "received_by": (value) => value ? null : ""
            }
        }
    )
    function startAddCustomer_AOperation() {
        modals.openContextModal({
            modal: "render_addCustomer_A",
            title: <Text size="xl" fw={700}>Add new customer accounting</Text>,
            fullScreen: false,
            centered: true,
            size: "lg",
            padding: "md",
            innerProps: {
            }
        })

    }
    function startEditCustomer_AOperation(data: CustomersAccounting | null) {
        modals.openContextModal({
            modal: "render_editCustomer_A",
            title: <Text size="xl" fw={700}>Edit Customer Accounting</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
                id: data?.id,
                "payment_date": data?.payment_date,
                "payment_method": data?.payment_method,
                "memo": data?.memo,
                "customer": data?.customer?.id.toString() ,
                "amount_paid": data?.amount_paid,
                "received_by": data?.received_by
            }
        })
    }

    async function createCustomerAccounting(): Promise<boolean> {
        setSubmiting(true);
        try {
            await api.post(
                "/api/v1/customer-accounting/",
                customer_form.values,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            customerStore.loadCustomers()
            accounting.loadCustomerAccounting()
            setSubmiting(false);
            return true;
        } catch (error) {
            setSubmiting(false);
            console.log(error);
            return false;
        }
    }
    async function updateCustomerA(id: number): Promise<boolean> {
        setSubmiting(true)
        try {
            await api.put(`/api/v1/customer-accounting/${id}/`, customer_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            customerStore.loadCustomers()
            accounting.loadCustomerAccounting()
            setSubmiting(false)
            return true
        } catch (error) {
            console.log(error)
            setSubmiting(false)
            return false
        }
    }

    async function deleteCustomer(id: number): Promise<boolean> {
        setSubmiting(true)
        try {
            await api.delete(`/api/v1/customer-accounting/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            setSubmiting(false)
            customerStore.loadCustomers()
            accounting.loadCustomerAccounting()
            return true
        } catch (error) {
            console.log(error)
            setSubmiting(false)
            return false
        }
    }
    return {
        createCustomerAccounting,
        updateCustomerA,
        deleteCustomer,
        startAddCustomer_AOperation,
        startEditCustomer_AOperation,
        customer_form,
        submiting,

    }
}