import { ActionIcon, Box, Button, Flex, Grid, Group, Input, ModalProps, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { observer } from "mobx-react";
import { useCustomerA_Operations } from "@renderer/hooks/by-modules/use.Customer.Accounting";
import { useEffect, useState } from "react";
import { Customers } from "@renderer/interface";
import { customerStore } from "@renderer/store/admin/customers";
import { MdPerson, MdPerson2 } from "react-icons/md";
import { useCustomerOperations } from "@renderer/hooks/by-modules/use.Customers";

interface innerProps extends ModalProps {
    innerProps: {
        id: number,
        "payment_date": string,
        "payment_method": string,
        "memo": string,
        "customer": any,
        "amount_paid": number,
        "received_by": string
    }
}


const EditCustomer_A = observer(({ innerProps }: innerProps) => {
    const { customer_form, submiting, updateCustomerA } = useCustomerA_Operations()
    const { startAddCustomerOperation } = useCustomerOperations()
    const [customers, setCustomers] = useState<Customers[]>([])
    useEffect(() => {
        setCustomers(customerStore.customers || [])
        customer_form.setValues(innerProps)
    }, [customerStore.customers])
    console.log(innerProps)
    return (
        <form
            onSubmit={customer_form.onSubmit(async () => {
                if (await updateCustomerA(innerProps.id)) {
                    customer_form.reset()
                }
            })}
        >
            <Box>
                <Stack w={`100%`}>
                    <Grid align="center">
                        <Grid.Col span={10}>
                            <Select {...customer_form.getInputProps("customer")} data={customers.map((data) => ({ label: data.customer_name, value: data.id.toString() }))} {...customer_form.getInputProps("customer")} label="Customer Name" />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Button mt={`lg`} onClick={startAddCustomerOperation}>
                                <MdPerson size={20} />
                            </Button>
                        </Grid.Col>
                    </Grid>
                    <TextInput {...customer_form.getInputProps("amount_paid")} label="Amount Payed" />
                    <Select {...customer_form.getInputProps("payment_method")} data={["cash", "transfer"]} label="Payment Method" />
                    <TextInput {...customer_form.getInputProps("received_by")} label="Received By" />
                    <TextInput {...customer_form.getInputProps("payment_date")} type="date" label="payment Date" />
                    <Textarea {...customer_form.getInputProps("memo")} label="Memo" />
                </Stack>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Edit</Button>
            </Box>
        </form>
    )

})

export default EditCustomer_A