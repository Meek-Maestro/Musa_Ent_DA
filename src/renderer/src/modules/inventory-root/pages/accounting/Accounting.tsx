import { Box, Button, Center, Divider, Group, SegmentedControl, Stack } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import { ReactNode, useEffect, useState } from "react";
import classes from "./index.module.css"
import SupplierAccountingTable from "@renderer/ui/organisms/data-table/accounting-supplier/SupplierAccountingTable";
import { useCustomerA_Operations } from "@renderer/hooks/by-modules/use.Customer.Accounting";
import CustomerAccountingTable from "@renderer/ui/organisms/data-table/accounting-customer/CustomerAccountingTable";
import { CustomersAccounting, SupplierAccounting } from "@renderer/interface";
import { useConfirm } from "@renderer/hooks/common/use.Confirm.Modals";
import { useSupplierA_Operations } from "@renderer/hooks/by-modules/use.Supplier.Accounting";


function Accounting() {
    const [value, setValue] = useState('customers');
    const [selectedCustomer, setSelectedCustomer] = useState<CustomersAccounting | null>(null)
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierAccounting | null>(null)
    const { startAddCustomer_AOperation, deleteCustomer } = useCustomerA_Operations()
    const {startAddSupplier_AOperation} = useSupplierA_Operations()
    const { confirmDelete } = useConfirm()

    const handleDeleteCustomer_A = () => {
        if (selectedCustomer) {
            confirmDelete(() => deleteCustomer(selectedCustomer.id), "Confirm Delete", "Are you sure you want to delete this resource?")
        }
    }
    const handleDeleteSupplier = () => {
        if (selectedSupplier) {
            confirmDelete(() => deleteCustomer(selectedSupplier.id), "Confirm Delete", "Are you sure you want to delete this resource?")
        }
    }
    const Utils = () => (
        <Box bg={`white`} p={`sm`} style={{ borderRadius: "12px" }}>
            <Group justify="space-between">
                {value === "suppliers" && (
                    <Stack>
                        <Group>
                            <Button className={classes.addBtn} variant="filled" onClick={startAddSupplier_AOperation}>Add Supplier Account</Button>
                            {/* <Button className={classes.editBtn} variant="filled">Edit Supplier Account</Button> */}
                            <Button className={classes.deleteBtn} variant="filled" onClick={handleDeleteSupplier}>Delete Supplier Account</Button>
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
                            <Button className={classes.addBtn} variant="filled" onClick={startAddCustomer_AOperation}>Add Customer Account</Button>
                            {/* <Button className={classes.editBtn} variant="filled" onClick={() => startEditCustomer_AOperation(selectedCustomer)}>Edit Customer Account</Button> */}
                            <Button className={classes.deleteBtn} variant="filled" onClick={handleDeleteCustomer_A}>Delete Customer Account</Button>
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
                                        <span>Manage Customer Accounts</span>
                                    </Center>
                                ), value: 'customers',
                            },
                            {
                                label: (
                                    <Center style={{ gap: 10 }}>
                                        <span>Manage Supplier Accounts</span>
                                    </Center>
                                ), value: 'suppliers'
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
    let sectionComponent: ReactNode;
    switch (value) {
        case 'suppliers':
            sectionComponent = <SupplierAccountingTable onselect={setSelectedSupplier} />
            break;
        case 'customers':
            sectionComponent = <CustomerAccountingTable onselect={setSelectedCustomer} />
            break;
        default:
            sectionComponent = null;
    }


    return (
        <AppPageWrapper title={"Accounting"} right={<UserButton />}>
            <Utils />
            <Box h={`70vh`} bg={`white`} style={{ borderRadius: "12px" }} mt={`sm`} p={`sm`}>
                {sectionComponent}
            </Box>
        </AppPageWrapper>
    );
}

export default Accounting;