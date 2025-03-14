import { Box, Button, Input, ModalProps, Select, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import { useSupplier } from "../../../../hooks/by-modules/use.AddSupplier";
import { useEffect } from "react";
import { modals } from "@mantine/modals";

interface EditCustomerProps extends ModalProps {
    innerProps: {
        id: string
        customer_name: string;
        phone_number: string;
        bank_name: string;
        bank_account_number: string;
        address: string;
        status: string;
    };
}

const EditSupplier = observer(({ innerProps }: EditCustomerProps) => {
    const { supplier_form, submiting, updateSupplier } = useSupplier()
    useEffect(() => {
        supplier_form.setValues(innerProps);
    }, [innerProps]);

    return (
        <form onSubmit={supplier_form.onSubmit(async () => {
            if (await updateSupplier(innerProps.id)) {
                supplier_form.reset()
                modals.closeAll()
            }
        })}>
            <Box>
                <SimpleGrid cols={2}>
                    <Stack>
                        <label >Supplier Name</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...supplier_form.getInputProps("supplier_name")} />
                        <label >Phone Number</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...supplier_form.getInputProps("phone_number")} />
                        <label >Address</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...supplier_form.getInputProps("address")} />
                    </Stack>
                    <Stack>
                        <label >Bank account Number</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...supplier_form.getInputProps("bank_account_number")} />
                        <label >Bank Name</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...supplier_form.getInputProps("bank_name")} />

                        <label >Status</label>
                        <Select styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" data={["active", "inactive"]} {...supplier_form.getInputProps("status")} />
                    </Stack>

                </SimpleGrid>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Update</Button>

            </Box>
        </form>
    )

})

export default EditSupplier