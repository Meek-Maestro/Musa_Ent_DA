import { Box, Button, Input, ModalProps, Select, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import { useCustomerOperations } from "../../../../hooks/by-modules/use.Customers";
import { useEffect } from "react";
import { modals } from "@mantine/modals";

interface EditCustomerProps extends ModalProps {
    innerProps: {
        id: number
        customer_name: string;
        phone_number: string;
        bank_name: string;
        bank_account_number: string;
        credit_limit: number
        address: string;
        status: string;
    };
}

const EditCustomer = observer(({ innerProps }: EditCustomerProps) => {
    console.log(innerProps)
    const { customer_form, updateCustomer, submiting } = useCustomerOperations()
    useEffect(() => {
        customer_form.setValues(innerProps);
    }, [innerProps]);

    return (
        <form onSubmit={customer_form.onSubmit(async () => {
            if (await updateCustomer(innerProps.id)) {
                customer_form.reset()
                modals.closeAll()
            }
        })}>
            <Box>
                <SimpleGrid cols={2}>
                    <Stack>
                        <label >Customer Name</label>
                        <Input value={innerProps?.customer_name} styles={{
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
                        <label >Credit Limit</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} type="number" variant="filled" {...customer_form.getInputProps("credit_limit")} />
                        <label >Status</label>
                        <Select styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" data={["active", "inactive"]} {...customer_form.getInputProps("status")} />
                    </Stack>

                </SimpleGrid>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Update</Button>

            </Box>
        </form>
    )

})

export default EditCustomer