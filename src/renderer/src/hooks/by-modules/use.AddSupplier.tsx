import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { authManager } from "../../store/auth"
import { useState } from "react"
import { api } from "../../api/api"
import { SupplierStore } from "../../store/admin/suppliers"

interface suppliers {
    "supplier_name": string,
    "phone_number": string,
    "bank_name": string,
    "bank_account_number": string,
    "address": string,
    "status": string
}

export function useSupplier() {
    const { access_token } = authManager.profile

    const [submiting, setSubmiting] = useState(false)
    const supplier_form = useForm<suppliers>({
        initialValues: {
            "supplier_name": "",
            "phone_number": "",
            "bank_name": "",
            "bank_account_number": "",
            "address": "",
            "status": "active"
        },
        validate: {
            "supplier_name": (value) => value ? null : "Supplier Name is required",
            "phone_number": (value) => value ? null : "Phone Number is required",
            "bank_name": (value) => value ? null : "Bank Name is required",
            "bank_account_number": (value) => value ? null : "Bank Account Number is required",
            "address": (value) => value ? null : "Address is required",
            "status": (value) => value ? null : "Status is required",
        }

    })
    function startAddSupplierOperation() {
        modals.openContextModal({
            modal: "render_addSupplier",
            title: <Text size="xl" fw={700}>Add New Supplier</Text>,
            fullScreen: false,
            centered: true,
            size: "lg",
            padding: "md",
            innerProps: {
            }
        })
    }
    function startEditSupplierOperation(data: any) {
        modals.openContextModal({
            modal: "render_editSupplier",
            title: <Text size="xl" fw={700}>Add New Supplier</Text>,
            fullScreen: false,
            centered: true,
            size: "lg",
            padding: "md",
            innerProps: {
                id: data?.id,
                "supplier_name": data?.supplier_name,
                "phone_number": data?.phone_number,
                "bank_name": data?.bank_name,
                "bank_account_number": data?.bank_account_number,
                "address": data?.address,
                "status": data?.status
            }
        })
    }
    async function saveSupplier(): Promise<boolean> {
        setSubmiting(true)
        try {
            const res = await api.post("/api/v1/suppliers/", supplier_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSubmiting(false)
            await SupplierStore.loadSuppliers()
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }

    async function updateSupplier(id: string):Promise<boolean> {
        setSubmiting(true)
        try {
            await api.put(`/api/v1/suppliers/${id}/`, supplier_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSubmiting(false)
            await SupplierStore.loadSuppliers()
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }

    async function deleteSupplier(id:string) {
         setSubmiting(true)
            try {
              await api.delete(`/api/v1/suppliers/${id}/`, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              })
              setSubmiting(false)
              SupplierStore.loadSuppliers()
              return true
            } catch (error) {
              console.log(error)
              setSubmiting(false)
              return false
            }
    }

    return {
        startAddSupplierOperation,
        startEditSupplierOperation,
        supplier_form,
        submiting,
        saveSupplier,
        deleteSupplier,
        updateSupplier
    }
}