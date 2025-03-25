import { api } from "@renderer/api/api";
import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";

class Backups {
    summary: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async loadSummary() {
        const { access_token } = authManager.profile
        const { data: data } = await api.get("api/v1/backup/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            // @ts-ignore
            silent: true,
        })
        runInAction(() => {
            this.summary = data.data
        })
    }
}

export const backupSummary = new Backups()