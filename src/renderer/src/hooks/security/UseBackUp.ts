import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api"
import { authManager } from "@renderer/store/auth"
import { useState } from "react"

interface IBackUPInput {
    "period": string
    "start_date": string
    "end_date": string
}

export function useBackUp() {
    const { access_token } = authManager.profile
    const [loading, setloading] = useState<boolean>(false)
    const backup_form = useForm<IBackUPInput>({
        initialValues: {
            period: "today",
            start_date: new Date().toISOString().split("T")[0],
            end_date: new Date().toISOString().split("T")[0]
        }, validate: {
            period: (value) => value ? null : "Select a period",
            start_date:(value)=> value ? null :"",
            end_date:(value)=> value ? null:""
        }
    })

    async function backup() {
        setloading(true)
        try {
            await api.post("")
        } catch (error) {

        }
    }

    async function restore() {
        await api.post("api/v1/backup/", backup_form.values, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        )
    }
    return {
        backup_form,
        loading,
        backup,
        restore
    }
}