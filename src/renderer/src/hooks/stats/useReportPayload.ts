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
    async function loadPOSReportByPayload(): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadPOSByPayload(reportForm.values)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }
    async function loadPurchaseReportByPayload(): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadPurchasesPayload(reportForm.values)
            console.log(true)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }
    async function loadStoreReportByPayload(name:string): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadStore({name})
            console.log(true)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        reportForm,
        loadPOSReportByPayload,
        loadPurchaseReportByPayload,
        loadStoreReportByPayload,
        loading
    }
}