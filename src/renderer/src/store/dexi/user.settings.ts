import { offlineRespository, OfflineRespository } from "./db";

class SettingsRespository {
    offlineDb: OfflineRespository = offlineRespository

    async getBaseURL(): Promise<string | undefined> {
        let item = await this.offlineDb.baseUrl.get(1)
        if (item == undefined) {
            return item
        }
        return item.url
    }

    async setBaseURL(value: string) {
        console.log(value)
        try {
            await this.offlineDb.baseUrl.clear()
            await this.offlineDb.baseUrl.add({ id: 1, url: value }, 1)
        } catch (error) {
            console.log(error)
        }
    }
    async clearBaseUrl() {
        try {
            await this.offlineDb.baseUrl.clear()
        } catch (error) {
            console.log(error)
        }
    }
}

export const settingsRespository = new SettingsRespository()