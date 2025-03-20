import { observer } from "mobx-react";
import { Table, ScrollArea, LoadingOverlay, Button } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { customerStore } from "../../../../store/admin/customers";

interface Props {
    onselect: (data: any) => void;
    closeModal: () => void;
}

export default observer(function CustomerDetails({ onselect, closeModal }: Props) {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setIsloading] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>({}); // Store selected customer

    useEffect(() => {
        setIsloading(true);
        setTimeout(() => {
            setCustomers(customerStore.customers || []);
            setIsloading(false);
        }, 500); // Simulate API delay
    }, [customerStore.customers]);

    // Function to handle customer selection
    const handleSelectCustomer = (customer: any) => {
        if (selectedCustomer?.id === customer.id) {
            setSelectedCustomer({}); // Deselect if already selected
            onselect({});
        } else {
            setSelectedCustomer(customer);
            onselect(customer);
        }
        closeModal()
    };

    return (
        <ScrollArea>
            {loading && <LoadingOverlay visible />}
            <Table striped highlightOnHover mt="lg" className={classes.table}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Customer Name</Table.Th>
                        <Table.Th>Phone Number</Table.Th>
                        <Table.Th>Address</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {customers.map((item, index) => (
                        <Table.Tr key={index} className={classes.rowSpacing}>
                            <Table.Td>{item.id}</Table.Td>
                            <Table.Td>{item.customer_name}</Table.Td>
                            <Table.Td>{item.phone_number}</Table.Td>
                            <Table.Td>{item.address}</Table.Td>
                            <Table.Td>{item.status}</Table.Td>
                            <Table.Td>
                                <Button
                                    variant={selectedCustomer?.id === item.id ? "filled" : "outline"}
                                    color={selectedCustomer?.id === item.id ? "green" : "blue"}
                                    onClick={() => handleSelectCustomer(item)}
                                >
                                    {selectedCustomer?.id === item.id ? "Selected" : "Select"}
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
});
