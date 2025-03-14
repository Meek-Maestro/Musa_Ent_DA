import { ActionIcon, Box, Checkbox, Group, ScrollArea, Table, Text, Title } from "@mantine/core";
import { observer } from "mobx-react";
import { MdDelete, MdEdit } from "react-icons/md";
import classes from "./table.module.css"

export default observer(function Cart() {
    const cartData = [
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
        {
            "Product Name": "Golden Penny",
            "Cost": "5000",
            "Quantity": "4",
            "Total": "20000",
        },
    ]
    return (
        <Box bg={`white`} h={`50vh`} p={`md`} style={{ borderRadius: "20px" }} pos={`relative`}>
            <Group justify="space-between">
                <Title order={3}>Cart</Title>
                <Group>
                    <ActionIcon variant="subtle">
                        <MdEdit size={30} />
                    </ActionIcon>
                    <ActionIcon variant="subtle">
                        <MdDelete size={30} />
                    </ActionIcon>
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
                                <Table.Th>
                                    <Checkbox />
                                </Table.Th>
                                {Object.keys(cartData[0]).map((key) => (
                                    <Table.Th key={key}>
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {cartData.map((item, index) => (
                                <Table.Tr key={index} className={classes.rowSpacing}>
                                    <Table.Td>
                                        <Checkbox />
                                    </Table.Td>
                                    {Object.values(item).map((value, i) => (
                                        <Table.Td key={i} className={classes.cellSpacing}>
                                            {value}
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>

                </ScrollArea>

            </Box>
            <Group justify="space-between" w={`90%`} pos={`absolute`} bottom={0} >
                <Title order={3}> Grand Total</Title>
                <Title order={3}>3000</Title>
            </Group>
        </Box>
    )
})