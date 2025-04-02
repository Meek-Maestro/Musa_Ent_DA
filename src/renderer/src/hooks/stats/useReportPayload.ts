import { useForm } from "@mantine/form"
import { ReportPayload } from "@renderer/interface"
import { reportsLoader } from "@renderer/store/admin/reports"
import { useState } from "react"

export function reportPayload() {
    const [loading, setLoading] = useState<boolean>(false)
    const date = new Date().toISOString().slice(0, 10)
    const reportForm = useForm<ReportPayload>({
        initialValues: {
            period: "today",
            end_date: date,
            start_date: date
        }
    })
    async function loadReportByPayload(): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadByPayload(reportForm.values)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }
    return { reportForm, loadReportByPayload, loading }
}