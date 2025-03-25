import { observer } from "mobx-react";
import { Table, ScrollArea, Text, Button, useMantineTheme, Box, Group, Checkbox, Divider, RingProgress } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { expenseStore } from "@renderer/store/admin/expenses";
import { defaultColors } from "@renderer/ui/constants/constants";
import { useExpenses } from "@renderer/hooks/by-modules/use.Expenses";
import { useConfirm } from "@renderer/hooks/common/use.Confirm.Modals";

interface props {
    onselect?: (data: any) => void;
    editAction: () => void
}

export default observer(function ExpenseDataTable({ onselect, editAction }: props) {
    const { deleteExpense } = useExpenses()
    const { confirmDelete } = useConfirm()
    const [expenses, setExpenses] = useState<any[]>([]);
    const [selectedExpenses, setSelectedExpenses] = useState<any[]>([]); // Track selected expenses

    useEffect(() => {
        setExpenses(expenseStore.expenses || []);
    }, [expenseStore.expenses]);

    const handleSelectExpense = (expense: any, isChecked: boolean) => {
        let updatedSelectedExpenses: any[];
        if (isChecked) {
            updatedSelectedExpenses = [...selectedExpenses, expense]; // Add the selected expense
        } else {
            updatedSelectedExpenses = selectedExpenses.filter((e) => e.id !== expense.id); // Remove the deselected expense
        }
        setSelectedExpenses(updatedSelectedExpenses);
        onselect?.(updatedSelectedExpenses); // Pass the updated list to the onselect callback
    };

    const handleSelectAll = (isChecked: boolean) => {
        if (isChecked) {
            setSelectedExpenses(expenses); // Select all expenses
            onselect?.(expenses);
        } else {
            setSelectedExpenses([]); // Deselect all expenses
            onselect?.([]);
        }
    };
    const handleDeleteExpense = () => {
        if (selectedExpenses.length > 0) {
            confirmDelete(async () => await deleteExpense(selectedExpenses[0]?.id), "Confirm Delete", "Are you sure you want to delete this resource?")
        } else {
            alert("No expense selected.")
        }
    }

    return (
        <Box>
            <Text size="lg" fw={600}>
                Recent Expenses
            </Text>
            <Group justify="end">
                <Button bg={defaultColors.darkRed} onClick={handleDeleteExpense}>Delete</Button>
                <Button bg={defaultColors.lightGreen} onClick={editAction}>Edit</Button>
                <Button bg={defaultColors.limeColor} onClick={() => {
                    expenseStore.loadExpenses()
                }}>Refresh</Button>
            </Group>
            <Divider mt={`sm`} />
            <ScrollArea>
                <Table striped highlightOnHover mt="lg" className={classes.table}>
                    <Table.Thead className={classes.stickyHeader}>
                        <Table.Tr>
                            <Table.Th>
                                <Checkbox
                                    checked={selectedExpenses.length === expenses.length && expenses.length > 0}
                                    indeterminate={
                                        selectedExpenses.length > 0 && selectedExpenses.length < expenses.length
                                    }
                                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                                />
                            </Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Notes</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={classes.scrollableBody}>
                        {expenses.map((item, index) => (
                            <Table.Tr key={index} className={classes.rowSpacing}>
                                <Table.Td>
                                    <Checkbox
                                        checked={selectedExpenses.some((e) => e.id === item.id)}
                                        onChange={(e) => handleSelectExpense(item, e.currentTarget.checked)}
                                    />
                                </Table.Td>
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