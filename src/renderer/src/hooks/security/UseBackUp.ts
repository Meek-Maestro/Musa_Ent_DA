import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api"
import { backupSummary } from "@renderer/store/admin/backups"
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
            start_date: (value) => value ? null : "",
            end_date: (value) => value ? null : ""
        }
    })

    async function backup(formData:FormData): Promise<boolean> {
        
        setloading(true)
        try {
            const backup = await api.post("api/v1/backup/", formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(backup)
            backupSummary.loadSummary()
            setloading(false)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setloading(false)
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