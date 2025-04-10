import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, Group, TextInput } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { SupplierStore } from "../../../../store/admin/suppliers";
import { MdSearch } from "react-icons/md";

interface props {
  onselect: (data: any) => void;
}

export default observer(function SuppliersDataTable({ onselect }: props) {
  const [suppliers, setSuppliers] = useState<any[]>([]); // Filtered suppliers
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  useEffect(() => {
    setSuppliers(SupplierStore.suppliers || []); // Initialize with all suppliers
  }, [SupplierStore.suppliers]);

  // Function to handle checkbox selection
  const handleSelectSupplier = (supplier: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSupplier(supplier);
      onselect(supplier);
    } else {
      setSelectedSupplier(null);
      onselect({});
    }
  };

  // Function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value.toLowerCase();
    setSuppliers(
      SupplierStore.suppliers.filter((supplier) =>
        supplier.supplier_name.toLowerCase().includes(searchValue) ||
        supplier.phone_number.toLowerCase().includes(searchValue) ||
        supplier.bank_name.toLowerCase().includes(searchValue) ||
        supplier.bank_account_number.toLowerCase().includes(searchValue) ||
        supplier.id.toString().toLowerCase().includes(searchValue) // Ensure `id` is converted to a string
      )
    );
  };

  return (
    <ScrollArea>
      <Group mb={`md`}>
        <TextInput
          w={`300px`}
          leftSection={<MdSearch size={20} />}
          placeholder="Search suppliers"
          onChange={handleSearch} // Call the search handler
        />
      </Group>
      <Table striped highlightOnHover mt="lg" className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Select</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Supplier Name</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Bank Name</Table.Th>
            <Table.Th>Bank Account No</Table.Th>
            <Table.Th>Balance</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {suppliers.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
                <Checkbox
                  checked={selectedSupplier?.id === item.id}
                  onChange={(event) =>
                    handleSelectSupplier(item, event.currentTarget.checked)
                  }
                />
              </Table.Td>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.supplier_name}</Table.Td>
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