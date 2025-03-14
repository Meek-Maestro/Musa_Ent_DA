import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, ActionIcon, Button, Text } from "@mantine/core";
import classes from "./table.module.css";
import { Key, useEffect, useState } from "react";
import { purchaseStore } from "../../../../store/admin/purchase";
import { useNavigate } from "react-router-dom";

interface props {
  onselect: (data: any) => void;
  filterText: string;
}


export default observer(function DamagedGoodsDataTable({ onselect, filterText }: props) {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const navigate = useNavigate()

  useEffect(() => {
    setPurchases(purchaseStore.purchases);
  }, [purchaseStore.purchases]);

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
            <Table.Th>ID</Table.Th>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Unit Price</Table.Th>

          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {purchases.map((item) => (
            item.damage_items.length > 0 && (
              item.damage_items.map((ditem: any, idx: number) => (
                <Table.Tr key={idx} className={classes.rowSpacing}>
                  <Table.Td>
                    <Checkbox
                      checked={selectedProduct?.id === item.id}
                      onChange={(event) => handleSelectProduct(ditem, event.currentTarget.checked)}
                    />
                  </Table.Td>
                  <Table.Td>{ditem?.id}</Table.Td>
                  <Table.Td>{ditem?.product_name}</Table.Td>
                  <Table.Td>{ditem?.discount}</Table.Td>
                  <Table.Td>{ditem?.quantity}</Table.Td>
                  <Table.Td>{ditem?.total}</Table.Td>
                  <Table.Td>
                    <Button onClick={() => navigate(`/view-purchase/${item.id}`, {
                      state: item?.id
                    })} variant="subtle">
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))

            ) || (
              <>
              <Text c={`dimmed`} ta={`center`} fw={`bold`}> No Damaged Products</Text>
              </>
            ).key
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});