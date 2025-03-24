import { observer } from "mobx-react";
import { Table, ScrollArea, Text, Button, useMantineTheme, Box, Group, Checkbox } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { expenseStore } from "@renderer/store/admin/expenses";
import { defaultColors } from "@renderer/ui/constants/constants";

interface props {
    onselect?: (data: any) => void;
}

export default observer(function ExpenseDataTable({ onselect, }: props) {
    const theme = useMantineTheme()
    const [expenses, setExpenses] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [select, setSelect] = useState(false)


    useEffect(() => {
        setExpenses(expenseStore.expenses || [])
    }, [expenseStore.expenses])

    const handleSelectProduct = (product: any, isChecked: boolean) => {
        if (isChecked) {
            setSelectedProduct(product);
            onselect?.(product);
        } else {
            setSelectedProduct(null);
            onselect?.({});
        }
    };

    const handleDeleteProduct = (id)=>{

    }



    return (
        <Box>
            <Text size="lg" fw={600}>Recent Expenses</Text>
            <Group justify="end">
                <Button bg={defaultColors.darkRed}>Delete</Button>
                <Button bg={defaultColors.lightGreen}>Edit</Button>
            </Group>
            <ScrollArea>
                <Table striped highlightOnHover mt="lg" className={classes.table} >
                    <Table.Thead className={classes.stickyHeader}>
                        <Table.Tr>
                            <Table.Th>Select</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Notes</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={classes.scrollableBody}>
                        {expenses.map((item, index) => (
                            <Table.Tr key={index} className={classes.rowSpacing}>
                                <Table.Td><Checkbox /></Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>₦{item.amount}</Table.Td>
                                <Table.Td>{item.category}</Table.Td>
                                <Table.Td>{item.notes ? item.notes : "No note"}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Box>
    );
});