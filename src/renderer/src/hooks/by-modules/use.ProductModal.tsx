import { modals } from "@mantine/modals"
import {Text} from "@mantine/core"

export function useProductsModal() {

    function startOpenOperation() {
        modals.openContextModal({
            modal: "render_productModal",
            title: <Text size="xl" fw={700}>Add New Product</Text>,
            fullScreen: false,
            centered: true,
            size: "xl",
            padding: "md",
            innerProps: {
            }
        })
    }

    return {
        startOpenOperation
    }
}