import { Box, Button, SimpleGrid, Stack, TextInput, Text, Divider, Paper, Textarea, Group, ActionIcon } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import { MdArrowRight, MdClearAll } from "react-icons/md"
import ExpenseTable from "@renderer/ui/organisms/data-table/expense-table/ExpenseTable"
import { useExpenses } from "@renderer/hooks/by-modules/use.Expenses"


const Payments = () => {
    const { expense_form, saveExpense, submiting } = useExpenses()
    return (
        <AppPageWrapper title={"Expenses"} right={<UserButton />}>
            <Box>
                <SimpleGrid cols={2} >
                    <Stack w={`100%`} p={`lg`} justify="center" h={`90vh`}>
                        <form onSubmit={expense_form.onSubmit(async () => {
                            await saveExpense()
                        })}>
                            <Paper shadow="sm" bg={`white`} p={`lg`}>
                                <Stack>
                                    <Group justify="space-between">
                                        <Text size="lg" fw={600}>New Expense</Text>
                                        <ActionIcon variant="subtle" c={`red`}>
                                            <MdClearAll size={30} />
                                        </ActionIcon>
                                    </Group>

                                    <TextInput {...expense_form.getInputProps("name")} label="Name" styles={{
                                        input: {
                                            height: "50px"
                                        }
                                    }} />
                                    <TextInput {...expense_form.getInputProps("amount")} label="Amount" type="number" styles={{
                                        input: {
                                            height: "50px"
                                        }
                                    }} />
                                    <TextInput {...expense_form.getInputProps("category")} label="Category" styles={{
                                        input: {
                                            height: "50px"
                                        }
                                    }} />
                                    <Textarea {...expense_form.getInputProps("notes")} label="Notes" styles={{
                                        input: {
                                            height: "100px"
                                        }
                                    }} />
                                    <Button type="submit" loading={submiting} rightSection={<MdArrowRight size={20} />}>
                                        Save
                                    </Button>
                                </Stack>
                            </Paper>
                        </form>
                    </Stack>

                    <Box w={`100%`} h={`100vh`} bg={`white`} p={`sm`}>
                        <ExpenseTable />
                    </Box>
                </SimpleGrid>
            </Box>
        </AppPageWrapper>
    )
}

export default Payments