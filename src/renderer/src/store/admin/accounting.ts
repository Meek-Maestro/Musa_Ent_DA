import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { api } from "@renderer/api/api";
import { CustomersAccounting, SupplierAccounting } from "@renderer/interface";

class Accounting {
    supplier_Accounting: SupplierAccounting[] = []
    customer_accounting: CustomersAccounting[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadCustomerAccounting() {
        const { access_token } = authManager.profile
        const { data: data } = await api.get("/api/v1/customer-accounting/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            // @ts-ignore
            silent: true,
        })
        runInAction(() => {
            this.customer_accounting = data
        })
    }
    async loadSupplierAccounting() {
        const { access_token } = authManager.profile
        const { data: data } = await api.get("api/v1/supplier-accounting/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            // @ts-ignore
            silent: true,
        })
        runInAction(() => {
            this.supplier_Accounting = data
        })
    }
}

export const accounting = new Accounting()