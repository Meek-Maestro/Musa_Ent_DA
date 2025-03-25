import { storeSummary } from "@renderer/store/summary";
import { runInAction } from "mobx";
import { useEffect, useState } from "react";

export function useSummary() {
    const [summary, setsummary] = useState<any>({})
    const [loading, setloading] = useState(false)
    const [storeName, setStoreName] = useState("General Summary")
    useEffect(() => {
        runInAction(()=>{
            setsummary(storeSummary.summary || {})
        })
        runInAction(()=>{
            storeName === "General Summary" && storeSummary.loadSummary()
        })
    }, [storeSummary.summary, storeName])

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
        TotalProducts: summary?.total_products?.total,
        TotalStock: summary?.total_stock?.total,
        LowStocks: summary?.low_stock?.total,
        OutOfStocks: summary?.out_of_stock?.total,
        loading,
        storeName,
        handleSelectStoreSummary
    }

}