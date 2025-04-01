import { api } from "../../api/api";
import { offlineRespository, OfflineRespository } from "./db";

export interface IAuthRespository {
  id?: number;
  user: any;
  auth_token: string
}
export interface ISettingsRes {
  url: string
  id?:number
}
class AuthRespository {
  offlineDb: OfflineRespository = offlineRespository
  async setAuthenticatedUser(data: any, token: string) {
    try {
      await this.offlineDb.auth.clear()
      await this.offlineDb.auth.add({ user: data, id: 1, auth_token: token }, 1)
    } catch (error) {
      throw error
    }
  }
  async getAuthenticatedUser(): Promise<{ auth_token: string; user: any } | undefined> {
    let item = await this.offlineDb.auth.get(1);
    if (item == undefined) {
      return item;
    }
    return {
      auth_token: item.auth_token,
      user: item.user,
    };
  }

  async clear() {
    await this.offlineDb.auth.clear();
  }


}

export let authRepository = new AuthRespository