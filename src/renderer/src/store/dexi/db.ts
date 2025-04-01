import Dexie from "dexie"
import { DEXIE_DB_NAME, DEXIE_DB_VERSION } from "."
import { IAuthRespository, ISettingsRes } from "./auth.repository"

export class OfflineRespository extends Dexie {
    auth!: Dexie.Table<IAuthRespository, number>
    baseUrl!: Dexie.Table<ISettingsRes, number>
    constructor() {
        super(DEXIE_DB_NAME);
        this.version(DEXIE_DB_VERSION).stores({
            auth: '++id, auth_token, user',
            baseUrl: "++id, url"
        })
    }
}

export const offlineRespository = new OfflineRespository