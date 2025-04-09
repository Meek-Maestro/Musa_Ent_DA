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
    async function loadStoreReportByPayload(name: string): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadStore({ name })
            console.log(true)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }
    async function loadCustomerAccountingPayload({
        period,
        end_date,
        start_date,
        customer_id
    }: { period: string, end_date: string, start_date: string, customer_id?: number }) {
        setLoading(true)
        try {
            await reportsLoader.loadCustomerAccountingByPayload({ period, end_date, start_date, customer_id })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function loadSupplierAccountingPayload({
        period,
        end_date,
        start_date,
        customer_id
    }: { period: string, end_date: string, start_date: string, customer_id?: number }) {
        setLoading(true)
        try {
            await reportsLoader.loadSupplierAccoutingByPayload({ period, end_date, start_date, customer_id })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function loadCustomerByPayload({
        credit_filter,
        customer_id
    }: { credit_filter: string, customer_id: string | number }) {
        setLoading(true)
        try {
            await reportsLoader.loadCustomersByPayload({ customer_id, credit_filter })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function loadSuppliersByPayload({
        credit_filter,
        supplier_id
    }: { credit_filter: string, supplier_id: string | number }) {
        setLoading(true)
        try {
            await reportsLoader.loadSuppliersByPayload({ supplier_id, credit_filter })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function loadExpenseReportByPayload(): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadExpenseByPayload(reportForm.values)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }
    async function loadStoreTransferReportByPayload(): Promise<boolean> {
        setLoading(true)
        try {
            await reportsLoader.loadStoreTransferByPayload(reportForm.values)
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
        loadCustomerAccountingPayload,
        loadSupplierAccountingPayload,
        loadCustomerByPayload,
        loadSuppliersByPayload,
        loadExpenseReportByPayload,
        loadStoreTransferReportByPayload,
        loading
    }
}