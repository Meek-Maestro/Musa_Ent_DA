import { api } from "@renderer/api/api";
import { makeAutoObservable, runInAction } from "mobx";
import { authManager } from "../auth";
import { POS_Report, ReportPayload } from "@renderer/interface";

class Reports {

    //Report query
    period: "today" | "this_week" | "this_month" | "week" | "full" = "today"
    start_date = new Date().toISOString().slice(0, 10)
    end_date = new Date().toISOString().slice(0, 10)
    //Report query

    Pos_reports: POS_Report = {
        pos: [],
        total_sales: 0,
        customers: 0,
        profit_margin: 0,
        products_sold: 0
    }

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
    async loadByPayload(payload: ReportPayload) {

        payload.period = payload.period.toLocaleLowerCase()
        payload.start_date = payload.start_date.toLocaleLowerCase()
        payload.end_date = payload.end_date.toLocaleLowerCase()

        console.log("Payloaaaaaad: ", payload)
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

}

export const reportsLoader = new Reports()