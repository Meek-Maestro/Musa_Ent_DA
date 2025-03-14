import { Checkbox, ScrollArea, Table, Text } from "@mantine/core";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { products } from "../../../../store/admin/products";
import classes from "./table.module.css"


export default observer(function StoreProducts({ storeName, filterText }: { storeName: string, filterText: string }) {
    const [products_, setProducts] = useState<any[]>([])
    useEffect(() => {
        setProducts(products.products.filter((p) => p.store.name === storeName) || [])
    }, [products.products, storeName])

    const filteredPurchases = products_.filter((product) =>
        product.product_name.toLowerCase().includes(filterText.toLowerCase()) ||
        product.id.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        product.sku.toLowerCase().includes(filterText.toLowerCase()) ||
        product.store.name.toLowerCase().includes(filterText.toLowerCase()) ||
        product.category.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <ScrollArea>
            {filteredPurchases.length > 0 ? (
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
                            <Table.Th>
                                ID
                            </Table.Th>
                            <Table.Th>
                                Product Name
                            </Table.Th>
                            <Table.Th>
                                Cost Price
                            </Table.Th>
                            <Table.Th>
                                Selling Price
                            </Table.Th>
                            <Table.Th>
                                Discount
                            </Table.Th>
                            <Table.Th>
                                Sku
                            </Table.Th>
                            <Table.Th>
                                Quantity
                            </Table.Th>
                            <Table.Th>
                                Description
                            </Table.Th>
                            <Table.Th>
                                Store
                            </Table.Th>
                            <Table.Th>
                                Category
                            </Table.Th>

                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {products_.map((item, index) => (
                            <Table.Tr key={index} className={classes.rowSpacing}>
                                <Table.Td>
                                    <Checkbox />
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
                <Text mt={`lg`} ta={`center`} c={`dimmed`}>No products assigned to this store</Text>
            )}

        </ScrollArea>
    )
})