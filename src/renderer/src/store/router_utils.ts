import { makeAutoObservable, runInAction } from "mobx"

class RouterUtilsManager{
    activeNavigationPath = "/"
    toggleMainDrawer:()=>void = ()=>{}
    constructor(){
        makeAutoObservable(this)
    }

    setActiveNavigationPath =(path:string)=>{
        runInAction(()=>{
            this.activeNavigationPath = path
            this.toggleMainDrawer
        })
    }

    toggleMainDrawerFunc(func:()=>void){
        runInAction(()=>{
            this.toggleMainDrawer = func
        })
    }
}

export const routerUtilsManager =  new RouterUtilsManager