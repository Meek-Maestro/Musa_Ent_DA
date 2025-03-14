import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api/api";
import { authManager } from "../auth";

class Product {
    products: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async loadProducts() {
        const { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("api/v1/products/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                 // @ts-ignore
                 silent: true,
            })
            runInAction(() => {
                this.products = data.data
            })
        } catch (error) {
            throw error
        }
    }
}

export const products = new Product()