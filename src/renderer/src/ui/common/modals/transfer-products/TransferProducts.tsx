import { ActionIcon, Box, Button, Group, Paper, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { useTransferProducts } from "@renderer/hooks/by-modules/use.TransferProducts";
import { ProductStore } from "@renderer/store/admin/stores";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

interface productsProps {
    selectedProducts: any[]
    deleteProduct: (id: number) => void
    closeModal: () => void
}

export default observer(function TransferProductModal({ selectedProducts, deleteProduct, closeModal }: productsProps) {
    const { transfer_form, transferProduct } = useTransferProducts();
    const [stores, setStores] = useState<any[]>([]);

    useEffect(() => {
        setStores(ProductStore.stores || []);
    }, [ProductStore.stores]);

    useEffect(() => {
        transfer_form.setFieldValue("from_store_id", selectedProducts[0]?.store.id);
        transfer_form.setFieldValue(
            "products",
            selectedProducts.map((data) => ({
                id: data.id,
                quantity: 0, 
            }))
        );
    }, []);

    return (
        <>
            <form
                onSubmit={transfer_form.onSubmit(async () => {
                    console.log(transfer_form.values);
                    if (await transferProduct()) {
                        closeModal();
                    }
                })}
            >
                <Box>
                    <Text size="lg" ta={`center`} fw={600} mb={`md`}>
                        Products from {selectedProducts[0]?.store.name}
                    </Text>
                    <Stack>
                        {selectedProducts?.map((data, index) => (
                            <Paper withBorder shadow="sm" p="sm" key={index}>
                                <Group justify="end">
                                    <ActionIcon
                                        onClick={() => deleteProduct(index)}
                                        radius={`xl`}
                                        variant="subtle"
                                        c={`red`}
                                    >
                                        <MdCancel size={30} />
                                    </ActionIcon>
                                </Group>
                                <Group justify="space-between">
                                    <Text size="lg">{data.product_name}</Text>
                                    <Text>
                                        Available Quantity:{" "}
                                        <span style={{ fontWeight: 600 }}>{data.quantity}</span>
                                    </Text>
                                    <TextInput
                                        {...transfer_form.getInputProps(`products.${index}.quantity`)}
                                        label="Select Quantity"
                                        type="number"
                                        error={
                                            transfer_form.errors.products?.[index]?.quantity ||
                                            (transfer_form.values.products[index]?.quantity > data.quantity
                                                ? "Quantity exceeds available stock"
                                                : null)
                                        }
                                    />
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                    <Group h={`20vh`} align="center" justify="space-between">
                        <Select
                            mt={`xl`}
                            variant="filled"
                            data={stores.map((data: any) => ({
                                label: data.name,
                                value: data.id.toString(),
                            }))}
                            label="Select Store"
                            placeholder="Transfer to..."
                            styles={{
                                input: {
                                    height: "50px",
                                },
                            }}
                            w={`50%`}
                            description="Select the store you wish to transfer the products to."
                            {...transfer_form.getInputProps("to_store_id")}
                            error={transfer_form.errors.to_store_id}
                        />
                    </Group>
                    <Group justify="end" mt={`sm`} p={`sm`} style={{ borderTop: "1px solid gainsboro" }}>
                        <Button type="submit" w={`200px`} h={`50px`}>
                            Transfer
                        </Button>
                    </Group>
                </Box>
            </form>
        </>
    );
});