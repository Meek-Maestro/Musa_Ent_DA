import { observer } from "mobx-react";
import { Table, ScrollArea, Button, TextInput, Stack, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { products } from "../../../../store/admin/products";
import { MdSearch } from "react-icons/md";
import classes from "./table.module.css";

interface Props {
  onselect?: (data: any) => void;
  closeModal:()=> void
}

export default observer(function ProductModalTable({ onselect, closeModal }: Props) {
  const [products_, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(products.products || []);
  }, [products.products]);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    onselect?.(product);
    closeModal()
  };

  const filteredProducts = products_.filter((product) =>
    product?.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    product?.cost_price?.toString().toLowerCase().includes(search.toLowerCase()) ||
    product?.description?.toLowerCase().includes(search.toLowerCase()) ||
    product?.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
    product?.store?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack>
      <Center>
        <TextInput
          w="30%"
          styles={{ input: { height: "50px" } }}
          placeholder="Search for a product"
          label="Search"
          leftSection={<MdSearch size={30} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Center>
      <ScrollArea h="65vh">
        <Table striped highlightOnHover mt="lg" className={classes.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product Name</Table.Th>
              <Table.Th>Cost Price</Table.Th>
              <Table.Th>Selling Price</Table.Th>
              <Table.Th>Discount</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredProducts.map((item, index) => (
              <Table.Tr key={index} className={classes.rowSpacing}>
                <Table.Td>{item?.product_name}</Table.Td>
                <Table.Td>{item?.cost_price}</Table.Td>
                <Table.Td>{item?.selling_price}</Table.Td>
                <Table.Td>{item?.discount}</Table.Td>
                <Table.Td>{item?.sku}</Table.Td>
                <Table.Td>{item?.quantity}</Table.Td>
                <Table.Td style={{ width: "100px" }}>
                  <Button
                    variant={selectedProduct?.id === item.id ? "filled" : "outline"}
                    color={selectedProduct?.id === item.id ? "green" : "blue"}
                    onClick={() => handleSelectProduct(item)}
                  >
                    {selectedProduct?.id === item.id ? "Selected" : "Select"}
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
});
