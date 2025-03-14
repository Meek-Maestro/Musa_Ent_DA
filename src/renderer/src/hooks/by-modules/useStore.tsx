import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import { api } from "../../api/api"
import { authManager } from "../../store/auth"
import { ProductStore } from "../../store/admin/stores"

interface IStoreInput {
    "name": string
    "location": string
}
export function useStore() {
    const { access_token } = authManager.profile
    const [submiting, setSubmiting] = useState(false)
    const store_form = useForm<IStoreInput>({
        initialValues: {
            name: "",
            location: ""
        },
        validate: {
            name: (value) => value ? null : "Store name is required",
        }
    })
    function startAddOperation() {
        modals.openContextModal({
            modal: "render_addStore",
            title: <Text size="xl" fw={700}>Add New Store</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
            }
        })
    }
    function startEditStoreOperation(data:any) {
        modals.openContextModal({
            modal: "render_editStore",
            title: <Text size="xl" fw={700}>Edit Store</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
                id:data?.id,
                name:data?.name,
                location:data?.location
            }
        })
    }
    async function saveStore() {
        setSubmiting(true)
        try {
            await api.post("/api/v1/stores/", store_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            ProductStore.loadStores()
            ProductStore.loadStockReports()
            setSubmiting(false)

            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }
    async function updateStore(id:string) {
        setSubmiting(true)
        try {
            await api.put(`/api/v1/stores/${id}/`, store_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            ProductStore.loadStores()
            ProductStore.loadStockReports()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }
    async function deleteStore(id: string): Promise<boolean> {
        setSubmiting(true)
        try {
          await api.delete(`/api/v1/stores/${id}/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          ProductStore.loadStores()
          ProductStore.loadStockReports() 
          setSubmiting(false) 
          return true
        } catch (error) {
          console.log(error)
          setSubmiting(false)
          return false
        }
      }

    return {
        startAddOperation,
        startEditStoreOperation,
        saveStore,
        updateStore,
        deleteStore,
        store_form,
        submiting
    }
}