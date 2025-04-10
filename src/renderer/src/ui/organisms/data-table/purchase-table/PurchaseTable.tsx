import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, ActionIcon, Button } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { purchaseStore } from "../../../../store/admin/purchase";
import { useNavigate } from "react-router-dom";

interface props {
  onselect: (data: any) => void;
  filterText: string;
}


export default observer(function PurchaseDataTable({ onselect, filterText }: props) {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const navigate = useNavigate()

  useEffect(() => {
    setPurchases(purchaseStore.purchases ||[]);
  }, [purchaseStore.purchases]);
  console.log(purchases)

  const handleSelectProduct = (product: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProduct(product);
      onselect(product);
    } else {
      setSelectedProduct(null);
      onselect({});
    }
  };

  const filteredPurchases = purchases.filter((product) =>
    product.purchase_date.toLowerCase().includes(filterText.toLowerCase()) ||
    product.id.toString().toLowerCase().includes(filterText.toLowerCase()) ||
    product.arrival_date.toLowerCase().includes(filterText.toLowerCase()) ||
    product.supplier.supplier_name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <ScrollArea>
      <Table striped highlightOnHover mt="lg" className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox />
            </Table.Th>
            <Table.Th>Order id</Table.Th>
            <Table.Th>Order date</Table.Th>
            <Table.Th>Arrival Date</Table.Th>
            <Table.Th>Supplier</Table.Th>
            <Table.Th>Total Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredPurchases.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
                <Checkbox
                  checked={selectedProduct?.id === item.id}
                  onChange={(event) => handleSelectProduct(item, event.currentTarget.checked)}
                />
              </Table.Td>
              <Table.Td>{item?.id}</Table.Td>
              <Table.Td>{item?.purchase_date.slice(0, 10)}</Table.Td>
              <Table.Td>{item?.arrival_date.slice(0, 10)}</Table.Td>
              <Table.Td>{item?.supplier?.supplier_name}</Table.Td>
              <Table.Td>{item?.purchase_items_total}</Table.Td>
              <Table.Td>
                <Button onClick={() => navigate(`/view-purchase/${item.id}`, {
                  state: item?.id
                })} variant="subtle">
                  View
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});