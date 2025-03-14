import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api/api";
import { authManager } from "../auth";

class Store {
    stores: any[] = []
    storeReport:any[]=[]
    constructor() {
        makeAutoObservable(this)
    }
    async loadStores() {
        const { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("api/v1/stores/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(() => {
                this.stores = data.data
            })

        } catch (error) {
            throw error
        }
    }
    async loadStockReports(){
        const { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("/api/v1/stores/all_stock_reports/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(() => {
                this.storeReport = data.data
            })

        } catch (error) {
            throw error
        }
    }
}

export const ProductStore = new Store()