import { ActionIcon, Box, Checkbox, Group, NumberInput, ScrollArea, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { observer } from "mobx-react";
import { MdClear, MdClearAll, MdClose, MdDelete, MdEdit } from "react-icons/md";
import classes from "./table.module.css"
import { useEffect, useState } from "react";
import { cartController } from "@renderer/store/cart";

interface cart {
    cartdetails: {
        "id": 0,
        "product_name": string,
        "cost_price": number,
        "selling_price": number,
        "discount": number,
        "sku": string,
        "quantity": number,
        "quantity_alert": number,
        "description": string,
        "store": number,
        "category": number,
    }[]
    delete_action: (id: number) => void
}
interface cartde {
    "id": 0,
    "product_name": string,
    "cost_price": number,
    "selling_price": number,
    "discount": number,
    "sku": string,
    "quantity": number,
    "quantity_alert": number,
    "description": string,
    "store": number,
    "category": number,
}

export default observer(function Cart() {
    const [cart_products, setCartProducts] = useState<cartde[]>([])
    useEffect(() => {
        setCartProducts(cartController.products || [])
    }, [cartController.products])

    return (
        <Box bg={`white`} h={`65vh`} p={`md`} style={{ borderRadius: "20px" }} pos={`relative`}>
            <Box>
                <ScrollArea h={`50vh`}>
                    <Table
                        striped
                        highlightOnHover
                        mt="lg"
                        className={classes.table}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    Product
                                </Table.Th>
                                <Table.Th>
                                    Quantity
                                </Table.Th>
                                <Table.Th>
                                    Sub Total
                                </Table.Th>
                                <Table.Th>
                                    Discount
                                </Table.Th>
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
                                            <Text size="sm">{item?.product_name}</Text>
                                            <Text size="sm">{item?.sku}</Text>
                                            <Text size="xs" c={`dimmed`}>{item.quantity} P(s) in stock</Text>
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Stack>
                                            <NumberInput defaultValue={`1`} w={`60px`} />
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Text size="md">
                                            ₦{item.selling_price}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <Stack>
                                            <NumberInput defaultValue={item.discount.toString()} w={`100px`} />
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        <ActionIcon onClick={() => cartController.deleteFromCart(item.id)} variant="subtle" c={`red`} bg={`red`} size={`md`}>
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
                <Group justify="space-between" w={`90%`} pos={`absolute`} bottom={0} >
                    <Stack>
                        <Text size="md" fw={600}>Items: {cart_products.length}</Text>
                    </Stack>
                    <Stack>
                        <Text size="md" fw={600}>
                            Total: ₦{cart_products.reduce((total, item) => total + item.selling_price * item.quantity, 0).toFixed(2)}
                        </Text>
                    </Stack>
                </Group>
            </Box>

        </Box>
    )
})