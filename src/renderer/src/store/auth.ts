import { makeAutoObservable, runInAction } from "mobx"
import { authRepository } from "./dexi/auth.repository"

class AuthManager {
    status: 'initial' | 'authenticated' | 'loaded' = 'loaded'
    profile: any = {}

    constructor() {
        makeAutoObservable(this)
    }
    async setAuthenticatedProfile(data: any, token: string) {
        try {
            await authRepository.setAuthenticatedUser(data, token)
            await this.loadAuthenticatedProfile()
        } catch (error) {

        }
    }
    async loadAuthenticatedProfile() {
        try {
            let payload = await authRepository.getAuthenticatedUser()
            runInAction(() => {
                this.profile = payload?.user
                this.status = "authenticated"
            })
        } catch (error) {
            runInAction(() => {
                this.status = "loaded"
            })
            throw error
        }
    }
    async init() {
        let payload = await authRepository.getAuthenticatedUser()
        if (payload == undefined) {
            runInAction(() => {
                this.status = "loaded"
            })
        } else {
            this.loadAuthenticatedProfile()
        }
    }
    async logout(){
        authRepository.getAuthenticatedUser()
        await authRepository.clear()
        runInAction(()=>{
            this.status = "loaded"
            this.profile = {}
        })
    }
}

    export const authManager = new AuthManager()