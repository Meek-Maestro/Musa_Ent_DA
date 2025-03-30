import { ActionIcon, Box, Group, NumberInput, ScrollArea, Select, Stack, Table, Text } from "@mantine/core";
import { observer } from "mobx-react";
import { MdClose } from "react-icons/md";
import classes from "./table.module.css"
import { useEffect, useState } from "react";
import { cartController } from "@renderer/store/cart";
import { useInvoice } from "@renderer/hooks/use.Invoice";
import { CartDetails } from "@renderer/interface";
import { customerStore } from "@renderer/store/admin/customers";

export default observer(function Cart() {
    const { invoice_form } = useInvoice();
    const [cart_products, setCartProducts] = useState<CartDetails[]>([]);
    const [customer, setCustomer] = useState<any[]>([]);

    useEffect(() => {
        setCartProducts(cartController.products || []);
        setCustomer(customerStore.customers || []);
    }, [cartController.products, customerStore.customers]);

    // Define the "Walk In Customer" object
    const walkInCustomer = {
        label: "Walk In Customer",
        value: '0',
    };

    // Combine "Walk In Customer" with actual customers
    const combinedCustomers = [walkInCustomer, ...customer.map((data) => ({
        label: data.customer_name.toString(),
        value: data.id.toString(),
    }))];

    return (
        <Box bg={`white`} h={`65vh`} p={`md`} style={{ borderRadius: "20px" }} pos={`relative`}>
            {/* Customer Selection Dropdown */}
            <Select
                defaultValue={walkInCustomer.value.toString()}
                data={combinedCustomers}
                onChange={(value: any) => {
                    cartController.setCustomer(value);
                    console.log(value)
                }}
            />
            <Box>
                <ScrollArea h={`50vh`}>
                    <Table striped highlightOnHover mt="lg" className={classes.table}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Product</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>Sub Total</Table.Th>
                                <Table.Th>Discount</Table.Th>
                                <Table.Th>
                                    <MdClose fontWeight={700} size={20} color="black" />
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {cart_products?.map((item, index) => (
                                <Table.Tr key={index} className={classes.rowSpacing}>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Stack>
                                            <Text size="sm">{item?.product}</Text>
                                            <Text size="sm">{item?.sku}</Text>
                                            <Text size="xs" c={`dimmed`}>
                                                {item.quantity} P(s) in stock
                                            </Text>
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Stack>
                                            <NumberInput defaultValue={item.quantity || ""} w={`60px`} />
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Text size="md">₦{item.subtotal}</Text>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Stack>
                                            <NumberInput defaultValue={item.discount.toString()} w={`100px`} />
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <ActionIcon
                                            onClick={() => cartController.deleteFromCart(item.id)}
                                            variant="subtle"
                                            c={`red`}
                                            bg={`red`}
                                            size={`md`}
                                        >
                                            <MdClose fontWeight={600} color="white" size={20} />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Box>
            <Box>
                <Group justify="space-between" w={`90%`} pos={`absolute`} bottom={0}>
                    <Stack>
                        <Text size="md" fw={600}>
                            Items: {cart_products.length}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text size="md" fw={600}>
                            Total: ₦
                            {cart_products
                                .reduce((total, item) => total + item.subtotal * item.quantity, 0)
                                .toFixed(2)}
                        </Text>
                    </Stack>
                </Group>
            </Box>
        </Box>
    );
});