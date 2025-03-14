import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api/api";
import { authManager } from "../auth";

class AdminManager {
    users: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadusers() {
        const { access_token } = authManager.profile
        const { data: data } = await api.get("/api/v1/users", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
             // @ts-ignore
             silent: true,
        })
        runInAction(() => {
            this.users = data.data
        })

    }

    async getUser(id: string) {
        const { data: data } = await api.get("/api/v1/users")
        const res = data.data
        console.log(res.data)
    }
}

export const userStore = new AdminManager