import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { products } from "../../../../store/admin/products";

interface props {
  onselect: (data: any) => void;
  filterText: string;
}

export default observer(function ProductDataTable({ onselect, filterText }: props) {
  const [products_, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    setProducts(products.products || []);
  }, [products.products]);

  const handleSelectProduct = (product: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProduct(product);
      onselect(product);
    } else {
      setSelectedProduct(null);
      onselect({});
    }
  };

  const filteredProducts = products_.filter((product) =>
    product.product_name.toLowerCase().includes(filterText.toLowerCase())||
    product.cost_price.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
    product.description.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
    product.category.name.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
    product.store.name.toLowerCase().includes(filterText.toLocaleLowerCase())
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
            <Table.Th>Cost Price</Table.Th>
            <Table.Th>Selling Price</Table.Th>
            <Table.Th>Discount</Table.Th>
            <Table.Th>Sku</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Store</Table.Th>
            <Table.Th>Category</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredProducts.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
                <Checkbox
                  checked={selectedProduct?.id === item.id}
                  onChange={(event) => handleSelectProduct(item, event.currentTarget.checked)}
                />
              </Table.Td>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.product_name}</Table.Td>
              <Table.Td>{item.cost_price}</Table.Td>
              <Table.Td>{item.selling_price}</Table.Td>
              <Table.Td>{item.discount}</Table.Td>
              <Table.Td>{item.sku}</Table.Td>
              <Table.Td>{item.quantity}</Table.Td>
              <Table.Td>{item.description}</Table.Td>
              <Table.Td>{item.store.name}</Table.Td>
              <Table.Td>{item.category.name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});