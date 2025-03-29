import { makeAutoObservable, runInAction } from "mobx";

class Cart {
    constructor() {
        makeAutoObservable(this)
    }
    products: any[] = []

    addToCart(state: any) {
        runInAction(() => {
            this.products.push(state)
        })
    }
    deleteFromCart(id: number) {
        runInAction(() => {
            this.products = this.products.filter((p) => p.id !== id)
        })
    }
}

export const cartController = new Cart()