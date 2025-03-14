import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import { api } from "../../api/api"
import { authManager } from "../../store/auth"
import { categoriesStore } from "../../store/admin/categories"

interface ICatInput {
    "name": string
}
export function useCategory() {
    const { access_token } = authManager.profile
    const [submiting, setSubmiting] = useState(false)
    const category_form = useForm<ICatInput>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => value ? null : "Store name is required",

        }
    })
    function startAddCategoryOperation() {
        modals.openContextModal({
            modal: "render_addCategory",
            title: <Text size="xl" fw={700}>Add New Category</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
            }
        })
    }
    function startEditCategoryOperation(data: any) {
        modals.openContextModal({
            modal: "render_editCategory",
            title: <Text size="xl" fw={700}>Add New Category</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
                id: data?.id,
                name: data?.name
            }
        })
    }
    async function saveCategory() {
        setSubmiting(true)
        try {
            await api.post("/api/v1/categories/", category_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            categoriesStore.loadCategories()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }
    async function updateCategory(id:string) {
        setSubmiting(true)
        try {
            await api.put(`/api/v1/categories/${id}/`, category_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            categoriesStore.loadCategories()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
        
    }
    async function deleteCategory(id: string) {
        setSubmiting(true)
        try {
            await api.delete(`/api/v1/categories/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            categoriesStore.loadCategories()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }

    return {
        startAddCategoryOperation,
        startEditCategoryOperation,
        saveCategory,
        updateCategory,
        category_form,
        submiting,
        deleteCategory
    }
}