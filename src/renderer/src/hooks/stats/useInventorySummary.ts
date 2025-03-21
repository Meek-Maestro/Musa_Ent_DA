import { products } from "@renderer/store/admin/products";
import { useEffect, useState } from "react";

export function useSummary() {
    const [products_, setProducts] = useState<any[]>([])
    console.log(products)

    useEffect(() => {
        setProducts(products.products)
    }, [products.products])

    function productsTotal() {
        return products_.length
    }
    function StocksTotal() {
        return products_.reduce((arr, item) => arr + item.quantity, 0)
    }
    function lowStocks() {
        return products_.filter((p) => p.quantity <= p.quantity_alert).length
    }
    function outOfStock() {
        return products_.filter((p) => p.quantity === 0).length
    }

    console.log("Products Total: ", productsTotal())
    console.log("Stocks Total: ", StocksTotal())
    console.log("Low Stocks", lowStocks())
    console.log("Out of Stocks", outOfStock())
    return {
        TotalProducts: productsTotal(),
        TotalStock: StocksTotal(),
        LowStocks: lowStocks(),
        OutOfStocks: outOfStock()
    }

}