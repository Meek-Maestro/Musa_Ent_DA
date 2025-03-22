import { api } from "@renderer/api/api";
import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "./auth";

class RecentSalesStore {
    recentSales: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadRecentSales() {
        const {access_token} = authManager.profile
        const { data: data } = await api.get("api/v1/pos/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            // @ts-ignore
            silent: true,
        })
        runInAction(() => {
            this.recentSales = data.data
        })
    }
   

}

export const recentSalesSummary = new RecentSalesStore()