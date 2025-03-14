import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { SupplierStore } from "../../../../store/admin/suppliers";

interface props{
  onselect:(data:any)=> void
}

export default observer(function SupplersDataTable({onselect}:props) {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  useEffect(() => {
    setSuppliers(SupplierStore.suppliers)
  }, [SupplierStore.suppliers])

  const handleSelectSupplier = (customer: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSupplier(customer);
      onselect(customer);
    } else {
      setSelectedSupplier(null);
      onselect({});
    }
  };

  return (
    <ScrollArea>
      <Table
        striped
        highlightOnHover
        mt="lg"
        className={classes.table}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox />
            </Table.Th>
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
