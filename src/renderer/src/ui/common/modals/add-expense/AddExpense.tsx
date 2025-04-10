import { Stack, Paper, Group, ActionIcon, TextInput, Textarea, Button, Text } from "@mantine/core";
import { useExpenses } from "@renderer/hooks/by-modules/use.Expenses";
import { observer } from "mobx-react";
import { MdClearAll, MdArrowRight } from "react-icons/md";

export default observer(function AddExpense() {
    const { expense_form, saveExpense, submiting } = useExpenses()
    const handleClearForm = () => {
        expense_form.reset();
    };
    return (
        <Stack w={`100%`} p={`lg`} justify="center" h={`90vh`}>
            <form
                onSubmit={expense_form.onSubmit(async () => {
                    await saveExpense();
                })}
            >
                <Paper shadow="sm" bg={`white`} p={`lg`}>
                    <Stack>
                        <Group justify="space-between">
                            <Text size="lg" fw={600}>
                                Edit Expense
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
                            Save
                        </Button>
                    </Stack>
                </Paper>
            </form>
        </Stack>
    )
})