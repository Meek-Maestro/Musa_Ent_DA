import { storeSummary } from "@renderer/store/summary";
import { runInAction } from "mobx";
import { useEffect, useState } from "react";

export function useSummary() {
    const [summary, setsummary] = useState<any>({})
    const [loading, setloading] = useState(false)
    const [storeName, setStoreName] = useState("General Summary")
    useEffect(() => {
        setsummary(storeSummary.summary || {})
        runInAction(()=>{
            storeName === "General Summary" && storeSummary.loadSummary()
        })
    }, [storeSummary.summary, storeName])

    function productsTotal() {
        return summary?.total_products?.total
    }
    function StocksTotal() {
        return summary?.total_stock?.total
    }
    function lowStocks() {
        return summary?.low_stock?.total
    }
    function outOfStock() {
        return summary?.out_of_stock?.total
    }
    const handleSelectStoreSummary = async (id: number, storeName: string) => {
        setloading(true)
        try {
            await storeSummary.loadSummaryById(id)
        } catch (error) {
            setloading(false)
        } finally {
            setloading(false)
            setStoreName(storeName)
        }
    }
    function categories() {

    }

    return {
        TotalProducts: productsTotal(),
        TotalStock: StocksTotal(),
        LowStocks: lowStocks(),
        OutOfStocks: outOfStock(),
        loading,
        storeName,
        handleSelectStoreSummary
    }

}