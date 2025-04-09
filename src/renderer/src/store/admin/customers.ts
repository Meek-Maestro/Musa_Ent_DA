import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api/api";
import { authManager } from "../auth";

class CustomerStore {
    customers: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async loadCustomers() {
        const {access_token}= authManager.profile
        try {
            const { data: data } = await api.get("api/v1/customers/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(()=>{
                this.customers = data.data
            })
            
        } catch (error) {
            throw error
        }
    }
}

export const customerStore = new CustomerStore