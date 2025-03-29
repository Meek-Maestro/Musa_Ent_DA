import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { Box, Button, Center, Divider, Group, SegmentedControl, Stack, useMantineTheme } from "@mantine/core";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import classes from "./index.module.css"
import { useState } from "react";
import SuppliersDataTable from "../../../../ui/organisms/data-table/suppliers-table/SuppliersDataTable";
import CustomerDataTable from "../../../../ui/organisms/data-table/customers-table/CustomerTable";
import { useSupplier } from "../../../../hooks/by-modules/use.AddSupplier";
import { useCustomerOperations } from "../../../../hooks/by-modules/use.Customers";
import { useConfirm } from "../../../../hooks/common/use.Confirm.Modals";

const Suppliers_Customers = observer(() => {
    const {confirmDelete}= useConfirm()
    const { startAddCustomerOperation, startEditCustomerOperation, deleteCustomer } = useCustomerOperations()
    const { startAddSupplierOperation, startEditSupplierOperation, deleteSupplier } = useSupplier()
    const [value, setValue] = useState('suppliers');
    const [selectedCustomer, setSelectedCustomer] = useState<any>({})
    const [selectedSupplier, setSelectedSupplier] = useState<any>({})

    const handleConfirmDeleteCustomer = () => {
        confirmDelete(async() => await deleteCustomer(selectedCustomer.id), "Confirm", `Are you sure you want to delete ${selectedCustomer.customer_name}`)
        setSelectedCustomer({})
    }
    const handleConfirmDeleteSupplier=()=>{
        confirmDelete(async() => await deleteSupplier(selectedSupplier.id), "Confirm", `Are you sure you want to delete ${selectedSupplier.supplier_name}`)
        setSelectedSupplier({})
    }
    const Utils = () => (
        <Box bg={`white`} p={`sm`} style={{ borderRadius: "12px" }}>
            <Group justify="space-between">
                {value === "suppliers" && (
                    <Stack>
                        <Group>
                            <Button className={classes.addBtn} variant="filled" onClick={startAddSupplierOperation}>Add supplier</Button>
                            <Button className={classes.editBtn} variant="filled" disabled={Object.keys(selectedSupplier).length === 0} onClick={()=>startEditSupplierOperation(selectedSupplier)}>Edit supplier</Button>
                            <Button className={classes.deleteBtn} variant="filled" disabled={Object.keys(selectedSupplier).length === 0} onClick={handleConfirmDeleteSupplier}>Delete supplier</Button>
                        </Group>

                        {/* <Group justify="center">
                            <Button className={classes.printBtn} leftSection={<MdPrint size={20} />}>Print</Button>
                            <Button className={classes.exportBtn} leftSection={<TiExport size={20} />}>Export</Button>
                        </Group> */}
                    </Stack>
                )}
                {value === "customers" && (
                    <Stack>
                        <Group>
                            <Button className={classes.addBtn} variant="filled" onClick={startAddCustomerOperation}>Add Customer</Button>
                            <Button className={classes.editBtn} disabled={Object.keys(selectedCustomer).length === 0} variant="filled" onClick={()=>startEditCustomerOperation(selectedCustomer)}>Edit Customer</Button>
                            <Button className={classes.deleteBtn} disabled={Object.keys(selectedCustomer).length === 0} variant="filled" onClick={handleConfirmDeleteCustomer}>Delete Customer</Button>
                        </Group>

                        {/* <Group justify="center">
                            <Button className={classes.printBtn} leftSection={<MdPrint size={20} />}>Print</Button>
                            <Button className={classes.exportBtn} leftSection={<TiExport size={20} />}>Export</Button>
                        </Group> */}
                    </Stack>
                )}

            </Group>


            <Box mt={`xl`}>
                <Divider />
                <Center mt={`md`}>
                    <SegmentedControl
                        value={value}
                        onChange={setValue}
                        data={[
                            {
                                label: (
                                    <Center style={{ gap: 10 }}>
                                        <span>Suppliers</span>
                                    </Center>
                                ), value: 'suppliers',
                            },
                            {
                                label: (
                                    <Center style={{ gap: 10 }}>
                                        <span>Customers</span>
                                    </Center>
                                ), value: 'customers'
                            },
                        ]}
                        styles={{
                            label: {
                                paddingInline: "50px",
                            }
                        }}
                    />
                </Center>
            </Box>
        </Box>
    )
    let sectionComponent;
    switch (value) {
        case 'suppliers':
            sectionComponent = <SuppliersDataTable onselect={setSelectedSupplier} />;
            break;
        case 'customers':
            sectionComponent = <CustomerDataTable onselect={setSelectedCustomer} />;
            break;
        default:
            sectionComponent = null;
    }

    return (
        <>
            <AppPageWrapper title="Suppliers/Customers" right={<UserButton />}>
                <Box>
                    <Utils />
                    <Box h={`70vh`} bg={`white`} style={{ borderRadius: "12px" }} mt={`sm`} p={`sm`}>
                        {sectionComponent}
                    </Box>
                </Box>
            </AppPageWrapper>
        </>
    )
})

export default Suppliers_Customers