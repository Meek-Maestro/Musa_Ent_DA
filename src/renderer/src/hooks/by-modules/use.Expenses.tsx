import { useForm } from "@mantine/form"
import { api } from "@renderer/api/api"
import { expenseStore } from "@renderer/store/admin/expenses"
import { authManager } from "@renderer/store/auth"
import { useState } from "react"

interface IexpenseInput {
    "amount": number,
    "name": string,
    "category": string,
    "notes": string,
    "printed": boolean
}
export function useExpenses() {
    const { access_token } = authManager.profile
    const expense_form = useForm<IexpenseInput>({
        initialValues: {
            amount: 0,
            name: "",
            category: "",
            notes: "",
            printed: false
        },
        validate: {
            amount: (value) => value <= 0 ? "Amount must be greater than 0" : null,
            name: (value) => value ? null : "Name is required"
        }
    })
    const [submiting, setSubmitting] = useState<boolean>(false)

    async function saveExpense() {
        setSubmitting(false)
        try {
            await api.post("api/v1/expense/", expense_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            expense_form.reset()
            await expenseStore.loadExpenses()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    async function updateExpense(id:string) {
        setSubmitting(false)
        try {
            await api.put(`api/v1/expense/${id}/`, expense_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            expense_form.reset()
            await expenseStore.loadExpenses()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    async function deleteExpense(id: number) {
        setSubmitting(false)
        try {
            await api.delete(`api/v1/expense/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            expense_form.reset()
            await expenseStore.loadExpenses()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return {
        expense_form,
        submiting,
        saveExpense,
        updateExpense,
        deleteExpense
    }
}