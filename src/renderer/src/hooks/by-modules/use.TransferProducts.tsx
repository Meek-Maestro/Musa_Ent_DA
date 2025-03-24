import { useForm } from "@mantine/form";
import { useState } from "react";
import { api } from "@renderer/api/api";
import { authManager } from "@renderer/store/auth";
import { ProductStore } from "@renderer/store/admin/stores";
import { products } from "@renderer/store/admin/products";

interface TransferProduct {
    id: number;
    quantity: number;
}

interface TransferRequest {
    from_store_id: number;
    to_store_id: number;
    products: TransferProduct[];
}

export function useTransferProducts() {
    const { access_token } = authManager.profile;
    const [submitting, setSubmitting] = useState<boolean>(false);

    const transfer_form = useForm<TransferRequest>({
        initialValues: {
            from_store_id: 0,
            to_store_id: 0,
            products: [],
        },
        validate: {
            from_store_id: (value) => (value > 0 ? null : "From store is required"),
            to_store_id: (value) => (value > 0 ? null : "To store is required"),
            products: {
                quantity: (value, values, path) => {
                    const index = parseInt(path.split(".")[1], 10); // Extract the index from the path
                    const product = values.products[index];
                    return product.quantity > 0
                        ? null
                        : "Quantity must be greater than 0";
                },
            },
        },
    });

    async function transferProduct(): Promise<boolean> {
        setSubmitting(true);
        try {
            await api.post("api/v1/store-transfer/", transfer_form.values, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await ProductStore.loadStores();
            await ProductStore.loadStockReports();
            await products.loadProducts()
            setSubmitting(false)
            return true;
        } catch (error) {
            console.error("Transfer failed:", error);
            return false;
        } finally {
            setSubmitting(false);
        }
    }

    return {
        transfer_form,
        submitting,
        transferProduct,
    };
}