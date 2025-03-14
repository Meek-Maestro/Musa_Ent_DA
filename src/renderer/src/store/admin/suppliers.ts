import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { api } from "../../api/api";

class Supplier {
    suppliers: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async loadSuppliers() {
        const { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("api/v1/suppliers/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(()=>{
                this.suppliers = data.data
            })
        } catch (error) {
            throw error
        }
    }
}

export const SupplierStore = new Supplier()