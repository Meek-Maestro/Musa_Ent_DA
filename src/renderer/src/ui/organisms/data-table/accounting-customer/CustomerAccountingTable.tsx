import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, LoadingOverlay } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { CustomersAccounting } from "@renderer/interface";
import { accounting } from "@renderer/store/admin/accounting";

interface props {
  onselect: (data: any) => void;
}

export default observer(function CustomerAccountingDataTable({ onselect }: props) {
  const [customers, setCustomers] = useState<CustomersAccounting[]>([]);
  const [loading, setIsloading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    setIsloading(true);
    setCustomers(accounting.customer_accounting || []);
    setIsloading(false);
  }, [accounting.customer_accounting]);

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
            <Table.Th>Amount Paid</Table.Th>
            <Table.Th>Received By</Table.Th>
            <Table.Th>Memo</Table.Th>
            <Table.Th>Payment Method</Table.Th>
            <Table.Th>Payment Date</Table.Th>
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
              <Table.Td>{item?.customer?.customer_name}</Table.Td>
              <Table.Td>{item.amount_paid}</Table.Td>
              <Table.Td>{item.received_by}</Table.Td>
              <Table.Td>{item.memo ? item.memo : "NIL"}</Table.Td>
              <Table.Td>{item.payment_method}</Table.Td>
              <Table.Td>{item.payment_date}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});