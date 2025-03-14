import { Box, Button, Input, ModalProps, Select, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import { useCustomerOperations } from "../../../../hooks/by-modules/use.Customers";

const AddCustomer = observer(() => {
    const { customer_form, saveCustomer, submiting } = useCustomerOperations()
    return (
        <form onSubmit={customer_form.onSubmit(async () => {
            if (await saveCustomer()) {
                customer_form.reset()
            }
        })}>
            <Box>
                <SimpleGrid cols={2}>
                    <Stack>
                        <label >Customer Name</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...customer_form.getInputProps("customer_name")} />
                        <label >Phone Number</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...customer_form.getInputProps("phone_number")} />
                        <label >Address</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...customer_form.getInputProps("address")} />
                    </Stack>
                    <Stack>
                        <label >Bank account Number</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...customer_form.getInputProps("bank_account_number")} />
                        <label >Bank Name</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...customer_form.getInputProps("bank_name")} />

                        <label >Status</label>
                        <Select styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" data={["active", "inactive"]} {...customer_form.getInputProps("status")} />
                    </Stack>

                </SimpleGrid>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Add</Button>

            </Box>
        </form>
    )

})

export default AddCustomer