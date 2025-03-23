import { Checkbox, ScrollArea, Table, Text } from "@mantine/core";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { products } from "../../../../store/admin/products";
import classes from "./table.module.css";

export default observer(function StoreProducts({
    storeName,
    filterText,
    select,
}: {
    storeName: string;
    filterText: string;
    select: (data: any[]) => void; // Updated to expect an array of selected products
}) {
    const [products_, setProducts] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // Store selected product objects

    useEffect(() => {
        setProducts(products.products.filter((p) => p.store.name === storeName) || []);
    }, [products.products, storeName]);

    const filteredPurchases = products_.filter(
        (product) =>
            product.product_name.toLowerCase().includes(filterText.toLowerCase()) ||
            product.id.toString().toLowerCase().includes(filterText.toLowerCase()) ||
            product.sku.toLowerCase().includes(filterText.toLowerCase()) ||
            product.store.name.toLowerCase().includes(filterText.toLowerCase()) ||
            product.category.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleSelectProduct = (product: any, isChecked: boolean) => {
        let updatedSelectedProducts;
        if (isChecked) {
            updatedSelectedProducts = [...selectedProducts, product]; // Add the product object
        } else {
            updatedSelectedProducts = selectedProducts.filter((p) => p.id !== product.id); // Remove the product object
        }
        setSelectedProducts(updatedSelectedProducts);
        select(updatedSelectedProducts); // Pass the updated list to the `select` callback
    };

    const handleSelectAll = (isChecked: boolean) => {
        let updatedSelectedProducts;
        if (isChecked) {
            updatedSelectedProducts = [...filteredPurchases]; // Select all filtered products
        } else {
            updatedSelectedProducts = []; // Deselect all products
        }
        setSelectedProducts(updatedSelectedProducts);
        select(updatedSelectedProducts); // Pass the updated list to the `select` callback
    };

    return (
        <ScrollArea>
            {filteredPurchases.length > 0 ? (
                <Table striped highlightOnHover mt="lg" className={classes.table}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Checkbox
                                    checked={selectedProducts.length === filteredPurchases.length}
                                    indeterminate={
                                        selectedProducts.length > 0 &&
                                        selectedProducts.length < filteredPurchases.length
                                    }
                                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                                />
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
                        {filteredPurchases.map((item, index) => (
                            <Table.Tr key={index} className={classes.rowSpacing}>
                                <Table.Td>
                                    <Checkbox
                                        checked={selectedProducts.some((p) => p.id === item.id)} // Check if the product is already selected
                                        onChange={(e) => handleSelectProduct(item, e.currentTarget.checked)} // Pass the entire product object
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
            ) : (
                <Text mt={`lg`} ta={`center`} c={`dimmed`}>
                    No products assigned to this store
                </Text>
            )}
        </ScrollArea>
    );
});