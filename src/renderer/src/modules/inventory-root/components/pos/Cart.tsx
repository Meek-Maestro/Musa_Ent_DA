import { ActionIcon, Box, Checkbox, Group, ScrollArea, Table, Text, Title, Tooltip } from "@mantine/core";
import { observer } from "mobx-react";
import { MdClear, MdClearAll, MdDelete, MdEdit } from "react-icons/md";
import classes from "./table.module.css"
import { useState } from "react";

interface cart {
    cartdetails: {
        product_name: string
        cost: number
        quantity: number
        total: number
    }[]
    delete_action: (i: any) => void
    edit_action: (i: any) => void
    clear_cart: () => void
}

export default observer(function Cart({ cartdetails, delete_action, edit_action, clear_cart }: cart) {
    const [selectedItem, setSelectedItem] = useState<number>()
    return (
        <Box bg={`white`} h={`50vh`} p={`md`} style={{ borderRadius: "20px" }} pos={`relative`}>
            <Group justify="space-between">
                <Title order={3}>Cart</Title>
                <Group>
                    <Tooltip label="Clear Cart">
                        <ActionIcon variant="subtle" onClick={clear_cart}>
                            <MdClearAll size={30} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Edit item">
                        <ActionIcon variant="subtle">
                            <MdEdit size={30} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip title="Delete Item" label="Delete item">
                        <ActionIcon variant="subtle" c={`red`} onClick={() => delete_action(selectedItem)}>
                            <MdDelete size={30} />
                        </ActionIcon>
                    </Tooltip>

                </Group>
            </Group>
            <Box>
                <ScrollArea h={`39vh`}>
                    <Table
                        striped
                        highlightOnHover
                        mt="lg"
                        className={classes.table}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th><Checkbox /></Table.Th>
                                <Table.Th>Product Name </Table.Th>
                                <Table.Th>
                                    Quantity
                                </Table.Th>
                                <Table.Th>
                                    Cost
                                </Table.Th>
                                <Table.Th>
                                    Total
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {cartdetails?.map((item, index) => (
                                <Table.Tr key={index} className={classes.rowSpacing}>
                                    <Table.Td>
                                        <Checkbox onChange={() => setSelectedItem(index)} />
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        {item?.product_name}
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        {item?.quantity}
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        {item?.cost}
                                    </Table.Td>
                                    <Table.Td className={classes.cellSpacing}>
                                        {item?.total}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Box>
            <Group justify="space-between" w={`90%`} pos={`absolute`} bottom={0} >
                <Title order={3}> Grand Total</Title>
                <Title order={3}>₦{cartdetails.reduce((arr, item) => arr + item.total, 0).toFixed(2)}</Title>
            </Group>
        </Box>
    )
})