import { CartDetails } from "@renderer/interface";
import { makeAutoObservable, runInAction, toJS } from "mobx";

class Cart {
    constructor() {
        makeAutoObservable(this)
    }
    products: CartDetails[] = []
    customer: number | string = 0
    payment_method: string = ""
    store: number = 0

    addToCart(state: CartDetails) {
        runInAction(() => {
            this.products.push(state)
        })
    }
    deleteFromCart(id: number) {
        runInAction(() => {
            this.products = this.products.filter((p) => p.id !== id)
        })
    }
    setPaymentMethod(method: string) {
        runInAction(() => {
            this.payment_method = method
        })
    }
    setStore(id: number) {
        runInAction(() => {
            this.store = id
        })
    }
    setCustomer(id: number) {
        runInAction(() => {
            this.customer = id
        })
    }

    getValues() {
        return {
            store: this.store,
            payment_method: this.payment_method,
            customer: this.customer == 0 ? null : this.customer,
            products: toJS(this.products),
            note: "",
            printed: false,
        };
    }

    cancelTransaction() {
        runInAction(() => {
            this.payment_method = ""
            this.products = []
            this.customer = 0
            this.store = 0
        })
    }

}

export const cartController = new Cart()