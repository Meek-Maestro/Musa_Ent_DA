import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { api } from "../../api/api";

class PurchaseStore {
    purchases: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadPurchases() {
        let { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("api/v1/purchase-orders/", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(() => {
                this.purchases = data.data
            })
        } catch (error) {
            throw error
        }
    }


}

export const purchaseStore = new PurchaseStore()
