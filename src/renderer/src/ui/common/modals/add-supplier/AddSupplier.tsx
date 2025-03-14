import { Box, Button, Input, Select, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import { useSupplier } from "../../../../hooks/by-modules/use.AddSupplier";

const AddSupplier = observer(() => {
    const { supplier_form,submiting, saveSupplier  } = useSupplier()
    return (
        <form onSubmit={supplier_form.onSubmit(async () => {
            if (await saveSupplier()) {
                supplier_form.reset()
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
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Add</Button>

            </Box>
        </form> 
    )

})

export default AddSupplier