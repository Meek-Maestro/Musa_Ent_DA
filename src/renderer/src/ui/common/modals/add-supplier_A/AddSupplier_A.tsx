import { Box, Button, Grid, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { useSupplierA_Operations } from "@renderer/hooks/by-modules/use.Supplier.Accounting";
import { SupplierStore } from "@renderer/store/admin/suppliers";
import { useSupplier } from "@renderer/hooks/by-modules/use.AddSupplier";

const AddSupplier_A = observer(() => {
    const { supplier_form, submiting, createSupplierAccounting } = useSupplierA_Operations()
   const {startAddSupplierOperation} = useSupplier()
    const [suppliers, setSuppliers] = useState<any[]>([])
    useEffect(() => {
        setSuppliers(SupplierStore.suppliers || [])
    }, [SupplierStore.suppliers])
    return (
        <form
            onSubmit={supplier_form.onSubmit(async () => {
                if (await createSupplierAccounting()) {
                    supplier_form.reset()
                }
            })}
        >
            <Box>
                <Stack w={`100%`}>
                    <Grid align="center">
                        <Grid.Col span={10}>
                            <Select data={suppliers.map((data) => ({ label: data.supplier_name.toString(), value: data.id.toString() }))} {...supplier_form.getInputProps("supplier")} label="Supplier" />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Button mt={`lg`} onClick={startAddSupplierOperation}>
                                <MdPerson size={20} />
                            </Button>
                        </Grid.Col>
                    </Grid>
                    <TextInput {...supplier_form.getInputProps("amount_paid")} label="Amount Payed" />
                    <Select {...supplier_form.getInputProps("payment_method")} data={["cash", "transfer"]} label="Payment Method" />
                    <TextInput {...supplier_form.getInputProps("received_by")} label="Received By" />
                    <TextInput {...supplier_form.getInputProps("payment_date")} type="date" label="payment Date" />
                    <Textarea {...supplier_form.getInputProps("memo")} label="Memo" />
                </Stack>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Add</Button>
            </Box>
        </form>
    )

})

export default AddSupplier_A