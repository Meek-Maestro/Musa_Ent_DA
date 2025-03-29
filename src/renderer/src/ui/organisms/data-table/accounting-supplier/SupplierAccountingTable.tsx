import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, LoadingOverlay } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { accounting } from "@renderer/store/admin/accounting";
import { SupplierAccounting } from "@renderer/interface";

interface props {
  onselect: (data: any) => void;
}

export default observer(function SupplierAccountingDataTable({ onselect }: props) {
  const [suppliers_A, setSuppliers_A] = useState<SupplierAccounting[]>([]);
  const [loading, setIsloading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    setIsloading(true);
    setSuppliers_A(accounting.supplier_Accounting || []);
    setIsloading(false);
  }, [accounting.supplier_Accounting]);

  console.log(suppliers_A)

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

  return (
    <ScrollArea>
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
          {suppliers_A.map((item, index) => (
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