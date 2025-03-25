import { Box, Button, SimpleGrid, Stack, TextInput, Text, Paper, Textarea, Group, ActionIcon } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import { MdArrowRight, MdClearAll } from "react-icons/md"
import ExpenseTable from "@renderer/ui/organisms/data-table/expense-table/ExpenseTable"
import { useExpenses } from "@renderer/hooks/by-modules/use.Expenses"
import { useState } from "react"
import { defaultColors } from "@renderer/ui/constants/constants"


const Payments = () => {
    const { expense_form, saveExpense, updateExpense, submiting } = useExpenses(); // Add updateExpense function
    const [selectedExpenses, setSelectedExpenses] = useState<any[]>([]); // Track selected expenses
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

    const handleEditExpense = () => {
        if (selectedExpenses.length === 1) {
            const expense = selectedExpenses[0];
            setIsEditing(true); 
            expense_form.setValues({
                name: expense.name,
                amount: expense.amount,
                category: expense.category,
                notes: expense.notes,
            });
        } else {
            alert("Please select a single expense to edit.");
        }
    };

    const handleClearForm = () => {
        setIsEditing(false);
        expense_form.reset(); 
    };

    return (
        <AppPageWrapper title={"Expenses"} right={<UserButton />}>
            <Box>
                <SimpleGrid cols={2}>
                    <Stack w={`100%`} p={`lg`} justify="center" h={`90vh`}>
                        <form
                            onSubmit={expense_form.onSubmit(async () => {
                                if (isEditing) {
                                    await updateExpense(selectedExpenses[0].id); 
                                } else {
                                    await saveExpense();
                                }
                                handleClearForm(); 
                            })}
                        >
                            <Paper shadow="sm" bg={`white`} p={`lg`}>
                                <Stack>
                                    <Group justify="space-between">
                                        <Text size="lg" fw={600}>
                                            {isEditing ? "Edit Expense" : "New Expense"}
                                        </Text>
                                        <ActionIcon variant="subtle" c={`red`} onClick={handleClearForm}>
                                            <MdClearAll size={30} />
                                        </ActionIcon>
                                    </Group>

                                    <TextInput
                                        {...expense_form.getInputProps("name")}
                                        label="Name"
                                        styles={{
                                            input: {
                                                height: "50px",
                                            },
                                        }}
                                    />
                                    <TextInput
                                        {...expense_form.getInputProps("amount")}
                                        label="Amount"
                                        type="number"
                                        styles={{
                                            input: {
                                                height: "50px",
                                            },
                                        }}
                                    />
                                    <TextInput
                                        {...expense_form.getInputProps("category")}
                                        label="Category"
                                        styles={{
                                            input: {
                                                height: "50px",
                                            },
                                        }}
                                    />
                                    <Textarea
                                        {...expense_form.getInputProps("notes")}
                                        label="Notes"
                                        styles={{
                                            input: {
                                                height: "100px",
                                            },
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        loading={submiting}
                                        rightSection={<MdArrowRight size={20} />}
                                    >
                                        {isEditing ? "Update" : "Save"}
                                    </Button>
                                </Stack>
                            </Paper>
                        </form>
                    </Stack>

                    <Box w={`100%`} h={`100vh`} bg={`white`} p={`sm`}>
                        <ExpenseTable editAction={handleEditExpense} onselect={setSelectedExpenses} />
                    </Box>
                </SimpleGrid>
            </Box>
        </AppPageWrapper>
    );
};

export default Payments;