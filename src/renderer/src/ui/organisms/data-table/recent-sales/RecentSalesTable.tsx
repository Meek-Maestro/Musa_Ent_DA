import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, Text, Button, useMantineTheme } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { recentSalesSummary } from "@renderer/store/recent_sales";

interface props {
    onselect: (data: any) => void;
}

export default observer(function RecentSalesTable({ onselect, }: props) {
    const theme = useMantineTheme()
    const [recentSales, setRecentSales] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null);


    useEffect(() => {
        setRecentSales(recentSalesSummary.recentSales || [])
    }, [recentSalesSummary.recentSales])

    const handleSelectProduct = (product: any, isChecked: boolean) => {
        if (isChecked) {
            setSelectedProduct(product);
            onselect(product);
        } else {
            setSelectedProduct(null);
            onselect({});
        }
    };

    console.log(recentSales)



    return (
        <ScrollArea h={`35vh`}>
        <Table striped highlightOnHover mt="lg" className={classes.table}>
            <Table.Thead className={classes.stickyHeader}>
                <Table.Tr>
                    <Table.Th>Customer Name</Table.Th>
                    <Table.Th>Products</Table.Th>
                    <Table.Th>Total Price</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody className={classes.scrollableBody}>
                {recentSales.map((item, index) => (
                    <Table.Tr key={index} className={classes.rowSpacing}>
                        <Table.Td>{item?.customer?.customer_name ? item?.customer?.customer_name:"Walk in customer"}</Table.Td>
                        <Table.Td>
                            {item.products.length > 1 ? (
                                <Text>
                                    {item.products[0].product_name} + {item.products.length - 1} others
                                </Text>
                            ) : (
                                <Text>{item.products[0]?.product_name}</Text>
                            )}
                        </Table.Td>
                        <Table.Td>
                            <Text>
                                ₦{item.products.reduce((total, product) => total + product.cost * product.quantity, 0).toFixed(2)}
                            </Text>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    </ScrollArea>
    );
});