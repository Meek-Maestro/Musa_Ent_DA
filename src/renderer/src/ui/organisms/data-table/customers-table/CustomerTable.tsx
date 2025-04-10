import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, LoadingOverlay, Group, TextInput } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { customerStore } from "../../../../store/admin/customers";
import { MdSearch } from "react-icons/md";

interface props {
  onselect: (data: any) => void;
}

export default observer(function CustomerDataTable({ onselect }: props) {
  const [customers, setCustomers] = useState<any[]>([]); // Filtered customers
  const [loading, setIsloading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    setIsloading(true);
    setCustomers(customerStore.customers || []); // Initialize with all customers
    setIsloading(false);
  }, [customerStore.customers]);

  // Function to handle checkbox selection
  const handleSelectCustomer = (customer: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCustomer(customer);
      onselect(customer);
    } else {
      setSelectedCustomer(null);
      onselect({});
    }
  };

  // Function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value.toLowerCase();
    setCustomers(
      customerStore.customers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchValue) ||
        customer.phone_number.toLowerCase().includes(searchValue) ||
        customer.bank_name.toLowerCase().includes(searchValue) ||
        customer.bank_account_number.toLowerCase().includes(searchValue) ||
        customer.id.toString().toLowerCase().includes(searchValue) // Ensure `id` is converted to a string
      )
    );
  };

  return (
    <ScrollArea>
      <Group mb={`md`}>
        <TextInput
          w={`300px`}
          leftSection={<MdSearch size={20} />}
          placeholder="Search customers..."
          onChange={handleSearch} // Call the search handler
        />
      </Group>
      <Table striped highlightOnHover mt="lg" className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Select</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Customer Name</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Bank Name</Table.Th>
            <Table.Th>Bank Account No</Table.Th>
            <Table.Th>Balance</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading && <LoadingOverlay visible />}
          {customers.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
                <Checkbox
                  checked={selectedCustomer?.id === item.id}
                  onChange={(event) =>
                    handleSelectCustomer(item, event.currentTarget.checked)
                  }
                />
              </Table.Td>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.customer_name}</Table.Td>
              <Table.Td>{item.phone_number}</Table.Td>
              <Table.Td>{item.bank_name}</Table.Td>
              <Table.Td>{item.bank_account_number}</Table.Td>
              <Table.Td>{item.balance}</Table.Td>
              <Table.Td>{item.address}</Table.Td>
              <Table.Td>{item.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});