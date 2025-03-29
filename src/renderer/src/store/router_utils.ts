import { makeAutoObservable, runInAction } from "mobx"

class RouterUtilsManager{
    activeNavigationPath:string | undefined = "/"
    toggleMainDrawer:()=>void = ()=>{}
    constructor(){
        makeAutoObservable(this)
    }

    setActiveNavigationPath =(path:string | undefined)=>{
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