import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api/api";
import { authManager } from "../auth";

class Categories {
    categories: any[] = []
    
    constructor() {
        makeAutoObservable(this)
    }
    async loadCategories() {
        const { access_token } = authManager.profile
        try {
            const { data: data } = await api.get("api/v1/categories/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                // @ts-ignore
                silent: true,
            })
            runInAction(() => {
                this.categories = data.data
            })

        } catch (error) {
            throw error
        }
    }
   
}

export const categoriesStore = new Categories()