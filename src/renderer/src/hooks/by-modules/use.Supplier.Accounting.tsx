import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { api } from "../../api/api"
import { useForm } from "@mantine/form"
import { SupplierAccounting } from "../../interface"
import { authManager } from "../../store/auth"
import { customerStore } from "../../store/admin/customers"
import { accounting } from "@renderer/store/admin/accounting"
import { SupplierStore } from "@renderer/store/admin/suppliers"

interface IformInput {
    "payment_date": string,
    "payment_method": string,
    "memo": string,
    "supplier": number,
    "amount_paid": number,
    "received_by": string
}

export function useSupplierA_Operations() {
    const { access_token } = authManager.profile

    const [submiting, setSubmiting] = useState(false)
    const supplier_form = useForm<IformInput>(
        {
            initialValues: {
                "payment_date": "",
                "payment_method": "",
                "memo": "",
                "supplier": 0,
                "amount_paid": 0,
                "received_by": ""
            },
            validate: {
                "payment_date": (value) => value ? null : "Select Date",
                "payment_method": (value) => value ? null : "Select Payment Method",
                "supplier": (value) => value ? null : "Please select a supplier",
                "amount_paid": (value) => value ? null : "Enter Amount Payed",
                // "received_by": (value) => value ? null : ""
            }
        }
    )
    function startAddSupplier_AOperation() {
        modals.openContextModal({
            modal: "render_addSupplier_A",
            title: <Text size="xl" fw={700}>Add New Supplier accounting</Text>,
            fullScreen: false,
            centered: true,
            size: "lg",
            padding: "md",
            innerProps: {
            }
        })

    }
    function startEditSupplier_AOperation(data: SupplierAccounting | null) {
        modals.openContextModal({
            modal: "render_editSupplier_A",
            title: <Text size="xl" fw={700}>Edit Supplier Accounting</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
                id: data?.id,
                "payment_date": data?.payment_date,
                "payment_method": data?.payment_method,
                "memo": data?.memo,
                "supplier": data?.supplier?.id.toString(),
                "amount_paid": data?.amount_paid,
                "received_by": data?.received_by
            }
        })
    }

    async function createSupplierAccounting(): Promise<boolean> {
        console.log(supplier_form.values)
        setSubmiting(true);
        try {
            await api.post(
                "/api/v1/supplier-accounting/",
                supplier_form.values,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            SupplierStore.loadSuppliers()
            accounting.loadSupplierAccounting()
            setSubmiting(false);
            return true;
        } catch (error) {
            setSubmiting(false);
            console.log(error);
            return false;
        }
    }
    async function updateSupplierA(id: number): Promise<boolean> {
        setSubmiting(true)
        try {
            await api.put(`/api/v1/customer-accounting/${id}/`, supplier_form.values, {
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
    async function ReloadSuppliers() {
        setSubmiting(true)
        try {
            await SupplierStore.loadSuppliers()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
        
    }
    return {
        createSupplierAccounting,
        updateSupplierA,
        deleteCustomer,
        startAddSupplier_AOperation,
        startEditSupplier_AOperation,
        ReloadSuppliers,
        supplier_form,
        submiting,

    }
}