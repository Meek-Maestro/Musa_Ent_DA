import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import { api } from "../../api/api"
import { userStore } from "../../store/admin/users"
import { authManager } from "../../store/auth"

interface IUserInput {
    "username": string,
    "role": string,
    "password": string
}

export function useUsers() {
    const { access_token } = authManager.profile
    const [submiting, setSubmiting] = useState(false)

    const user_form = useForm<IUserInput>({
        initialValues: {
            username: "",
            role: "",
            password: ""
        },
        validate: {
            username: (value) => (value ? null : "Username is required"),
            role: (value) => (value ? null : "role is required"),
            password: (value) => (value ? null : "Password is required")
        }
    })
    function startAddUserOperation() {
        modals.openContextModal({
            modal: "render_addUser",
            title: <Text size="xl" fw={700}>Add New User</Text>,
            fullScreen: false,
            centered: true,
            size: "lg",
            padding: "md",
            innerProps: {
            }
        })
    }
    function startEditUserOperation(data: any) {
        modals.openContextModal({
            modal: "render_editUser",
            title: <Text size="xl" fw={700}>Edit User</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
                id: data?.id,
                "username": data?.username,
                "email": data?.email,
                "role": data?.role,
                "password": data?.password
            }
        })
    }
    async function saveUser(): Promise<boolean> {
        setSubmiting(true)
        try {
            await api.post("/api/v1/users/", user_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            userStore.loadusers()
            setSubmiting(false)
            return true
        } catch (error) {
            setSubmiting(false)
            throw error
        }
    }
    async function updateUser(id: string): Promise<boolean> {
        setSubmiting(true)

        try {
            await api.put(`/api/v1/users/${id}/`, user_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            userStore.loadusers()
            setSubmiting(false)
            return true
        } catch (error) {
            console.log(error)
            setSubmiting(false)
            return false
        }
    }
    async function deleteUser(id: string): Promise<boolean> {
        setSubmiting(true)
        try {
            await api.delete(`/api/v1/users/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            setSubmiting(false)
            userStore.loadusers()
            return true
        } catch (error) {
            console.log(error)
            setSubmiting(false)
            return false
        }
    }
    return {
        startAddUserOperation,
        startEditUserOperation,
        user_form,
        saveUser,
        updateUser,
        deleteUser,
        submiting
    }
}