import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { api } from "@renderer/api/api"
import { authManager } from "@renderer/store/auth"
import { recentSalesSummary } from "@renderer/store/recent_sales"
import { useState } from "react"

export function useRecentTransactions() {
    const { access_token } = authManager.profile
    const [submiting, setSubmitting] = useState(false)
    function startopenRecentOperation() {
        modals.openContextModal({
            modal: "render_recentTransaction",
            title: <Text size="xl" fw={700}>Transactions</Text>,
            centered: true,
            fullScreen: true,
            innerProps: {
            }
        })
    }
    function startviewTransactionOperation() {
        modals.openContextModal({
            modal: "render_recentTransaction",
            title: <Text size="xl" fw={700}>Edit User</Text>,
            centered: true,
            fullScreen: true,
            innerProps: {
            }
        })
    }
    async function refresh(){
        setSubmitting(true)
        try {
            await recentSalesSummary.loadRecentSales()
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }
    async function deleteTransaction(id: number) {
        setSubmitting(true)
        try {
            await api.delete(`api/v1/pos/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            await recentSalesSummary.loadRecentSales()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return {
        startopenRecentOperation,
        startviewTransactionOperation,
        deleteTransaction,
        refresh,
        submiting
    }
}