import { api } from "@renderer/api/api";
import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { POS_Report, Purchase, ReportPayload, storeReport, CustomerAccounting, SupplierAccounting, CustomerReport, SupplierReport, ExpenseReport, StoreTransferReport } from "@renderer/interface";

class Reports {

    //Report payload
    period: "today" | "this_week" | "this_month" | "week" | "full" = "today"
    start_date = new Date().toISOString().slice(0, 10)
    end_date = new Date().toISOString().slice(0, 10)
    //Report payload

    Pos_reports: POS_Report = {
        pos: [],
        total_sales: 0,
        customers: 0,
        profit_margin: 0,
        products_sold: 0
    }

    purchase: Purchase[] = []

    store: storeReport[] = []

    customerAccounting: CustomerAccounting[] = []

    supplierAccounting: SupplierAccounting[] = []

    customer: CustomerReport[] = []

    supplier: SupplierReport[] = []

    expenses: ExpenseReport = {
        expenses: [],
        total_amount: 0
    }

    storeTransfer: StoreTransferReport[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async loadPOS() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/pos_report/",
            {
                period: this.period,
                start_date: this.start_date,
                end_date: this.end_date
            }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.Pos_reports = data.data
        })
    }

    async loadPOSByPayload(payload: ReportPayload) {

        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/pos_report/",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.Pos_reports = data.data
        })
    }

    async loadPurchases() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/purchase_report/",
            {
                period: this.period,
                start_date: this.start_date,
                end_date: this.end_date
            }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.purchase = data.data
        })
    }

    async loadPurchasesPayload(payload: ReportPayload) {
        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/purchase_report/",
            payload, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.purchase = data.data
        })
    }

    async loadStore({ name }: { name: string }) {
        console.log(name)
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/store_report/",
            { name },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.store = data.data
        })
    }
    async loadCustomerAccounting() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/customer_accounting_report/",
            {
                period: this.period,
                start_date: this.start_date,
                end_date: this.end_date
            }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.customerAccounting = data.data
        })
    }
    async loadCustomerAccountingByPayload(payload: any) {
        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/customer_accounting_report/",
            payload, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.customerAccounting = data.data
        })
    }
    async loadSuppliersAccounting() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/supplier_accounting_report/",
            {
                period: this.period,
                start_date: this.start_date,
                end_date: this.end_date
            }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.supplierAccounting = data.data
        })
    }

    async loadSupplierAccoutingByPayload(payload: any) {
        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        console.log(payload)
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/supplier_accounting_report/",
            payload, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            //@ts-ignore
            silent: true
        })

        runInAction(() => {
            this.supplierAccounting = data.data
        })
    }

    async loadCustomers() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/customer_report/", {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.customer = data.data
        })
    }
    async loadCustomersByPayload({ customer_id, credit_filter }: { customer_id: string | number, credit_filter: string }) {
        credit_filter = credit_filter.toLowerCase()
        customer_id == null ? customer_id = 0 : customer_id = Number(customer_id)

        console.log({ customer_id, credit_filter })
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/customer_report/", { customer_id, credit_filter },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.customer = data.data
        })
    }
    async loadSuppliers() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/supplier_report/", {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.supplier = data.data
        })
    }
    async loadSuppliersByPayload({ supplier_id, credit_filter }: { supplier_id: string | number, credit_filter: string }) {
        credit_filter = credit_filter.toLowerCase()
        supplier_id == null ? supplier_id = 0 : supplier_id = Number(supplier_id)


        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/supplier_report/", { supplier_id, credit_filter },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.supplier = data.data
        })
    }
    async loadExpenses() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/expense_report/", {
            period: this.period,
            start_date: this.start_date,
            end_date: this.end_date
        },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.expenses = data.data
        })
    }
    async loadExpenseByPayload(payload: ReportPayload) {

        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        console.log(payload)

        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/expense_report/",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })
        runInAction(() => {
            this.expenses = data.data
        })
    }
    async loadStoreTransfer() {
        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/store_transfer_report/", {
            period: this.period,
            start_date: this.start_date,
            end_date: this.end_date
        },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.storeTransfer = data.data
        })
    }
    async loadStoreTransferByPayload(payload: ReportPayload) {

        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        const { access_token } = authManager.profile
        const { data: data } = await api.post("api/v1/report/store_transfer_report/",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                //@ts-ignore
                silent: true
            })

        runInAction(() => {
            this.storeTransfer = data.data
        })
    }
}

export const reportsLoader = new Reports()