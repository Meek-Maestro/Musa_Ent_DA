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
    const defaultDir = localStorage.getItem("backup_dir") || "C://users/user/documents/backups"
    const { access_token } = authManager.profile
    const [loading, setloading] = useState<boolean>(false)
    const [backupDir, setBackupDir] = useState<string>(defaultDir)

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

    async function backup(formData: FormData): Promise<boolean> {

        setloading(true)
        try {
            const backup = await api.post("api/v1/backup/", formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(backup)
            downloadFile(backup.data.data.download_url)
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

    async function restore(file: File | any) {
        setloading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            await api.post("api/v1/backup/restore/", formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            console.error("Restore failed:", error);
        } finally {
            setloading(false);
        }
    }
    async function deletBackupRecord(id: string) {
        setloading(false)
        try {
            await api.delete(`api/v1/backup/${id}/`, {
                headers:{
                    Authorization:`Bearer ${access_token}`
                }
            })
            backupSummary.loadSummary()
            setloading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    // Function to select a backup directory
    async function selectBackupDirectory() {
        const dirPath = await window.api.invoke("select-backup-directory")
        if (dirPath) {
            setBackupDir(dirPath)
            localStorage.setItem("backup_dir", dirPath) // Save for future use
        }
    }
    async function downloadFile(url: string) {
        const date = new Date().toISOString().slice(0, 10)
        const fileName = `backup${date}.json`;
        const saveDir = localStorage.getItem("backup_dir");

        if (!saveDir) {
            alert("Please select a backup directory first.");
            return;
        }

        const result = await window.api.invoke("download-file", { url, fileName, saveDir });

        if (result.success) {
            alert(`File downloaded to: ${result.filePath}`);
        } else {
            alert(`Download failed: ${result.error}`);
        }
    }




    return {
        backup_form,
        loading,
        backup,
        restore,
        selectBackupDirectory,
        backupDir,
        deletBackupRecord
    }
}