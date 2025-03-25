import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { api } from "@renderer/api/api";

class ExpenseStore {
    expenses: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadExpenses() {
        const { access_token } = authManager.profile
        const { data: data } = await api.get("api/v1/expense/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            // @ts-ignore
            silent: true,
        })
        runInAction(() => {
            this.expenses = data.data
        })
    }
}

export const expenseStore = new ExpenseStore()