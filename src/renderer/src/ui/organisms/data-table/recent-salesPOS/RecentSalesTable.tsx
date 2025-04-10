import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, Text, Button, useMantineTheme, ActionIcon, Divider, Space, Paper, Group, LoadingOverlay } from "@mantine/core";
import classes from "./table.module.css";
import React, { useEffect, useState } from "react";
import { recentSalesSummary } from "@renderer/store/recent_sales";
import { MdChevronRight, MdDelete, MdPrint } from "react-icons/md";
import { useRecentTransactions } from "@renderer/hooks/by-modules/use.RecentTransactions";

interface props {
    filterByDate?: string;
    filterBytext?:string
}

export default observer(function RecentSalesTable({ filterByDate, filterBytext }: props) {
    const { deleteTransaction, submiting, rePrintInvoice } = useRecentTransactions();
    const theme = useMantineTheme();
    const [recentSales, setRecentSales] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [viewProducts, setViewProducts] = useState(false);

    useEffect(() => {
        // Filter by date and text
        const filteredSales = recentSalesSummary.recentSales.filter((data) => {
            const matchesDate = data.created_at.slice(0, 10) === filterByDate;
            const matchesText =
                !filterBytext || // If no filterBytext, include all
                data.customer?.customer_name?.toLowerCase().includes(filterBytext.toLowerCase()) ||
                // data.store?.toLowerCase().includes(filterBytext.toLowerCase()) ||
                data.payment_method?.toLowerCase().includes(filterBytext.toLowerCase()) ||
                data.products.some((product: any) =>
                    product.product_name.toLowerCase().includes(filterBytext.toLowerCase())
                );
            return matchesDate && matchesText;
        });

        setRecentSales(filteredSales);
    }, [recentSalesSummary.recentSales, filterByDate, filterBytext]);

    function deleteSales() {
        if (!selectedProduct?.id) return;
        if (window.confirm("Do you want to Delete the invoice?")) {
            deleteTransaction(selectedProduct.id);
        }
    }

    return (
        <ScrollArea h={`80vh`}>
            {submiting && <LoadingOverlay visible />}
            {recentSales.length > 0 ? (
                <Table highlightOnHover mt="lg" className={classes.table}>
                    <Table.Thead className={classes.stickyHeader}>
                        <Table.Tr>
                            <Table.Th>Customer Name</Table.Th>
                            <Table.Th>Products</Table.Th>
                            <Table.Th>Total Price</Table.Th>
                            <Table.Th>Created At</Table.Th>
                            <Table.Th>Payment Method</Table.Th>
                            <Table.Th>Store</Table.Th>
                            <Table.Th>View</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={classes.scrollableBody}>
                        {recentSales.map((item, index) => (
                            <React.Fragment key={index}>
                                <Table.Tr className={classes.rowSpacing}>
                                    <Table.Td>{item.customer?.customer_name || "Walk in customer"}</Table.Td>
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
                                    <Table.Td>{item.created_at.slice(0, 10)}</Table.Td>
                                    <Table.Td>{item.payment_method}</Table.Td>
                                    <Table.Td>{item.store}</Table.Td>
                                    <Table.Td>
                                        <ActionIcon
                                            color="green"
                                            size="lg"
                                            variant="subtle"
                                            c={theme.colors.blue[5]}
                                            onClick={() => {
                                                setViewProducts((o) => !o);
                                                setSelectedProduct(item);
                                            }}
                                        >
                                            <MdChevronRight
                                                style={
                                                    viewProducts && selectedProduct?.id === item.id
                                                        ? { rotate: "90deg", transition: "0.5s ease all" }
                                                        : {}
                                                }
                                                size={30}
                                                fontWeight={600}
                                            />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                                {viewProducts && selectedProduct?.id === item?.id && (
                                    <Table.Tr bg={theme.colors.gray[1]}>
                                        <Table.Td colSpan={7}>
                                            <Text ta={`center`} fw={`bold`} c={`dimmed`}>
                                                Item Purchased
                                            </Text>
                                            <Group justify="end" p={`sm`}>
                                                <ActionIcon onClick={() => deleteSales()} size={`md`} variant="subtle" c={`red`}>
                                                    <MdDelete size={30} />
                                                </ActionIcon>
                                                <ActionIcon
                                                    size={`md`}
                                                    variant="subtle"
                                                    c={`blue`}
                                                    onClick={() => rePrintInvoice(JSON.stringify(item))}
                                                >
                                                    <MdPrint size={30} />
                                                </ActionIcon>
                                            </Group>
                                            <Space h={10} />
                                            <Divider />
                                            <Table
                                                style={{
                                                    borderLeft: `5px solid ${theme.colors.blue[3]}`,
                                                }}
                                                striped
                                                highlightOnHover
                                                withColumnBorders
                                            >
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th>Product Name</Table.Th>
                                                        <Table.Th>SKU</Table.Th>
                                                        <Table.Th>Cost</Table.Th>
                                                        <Table.Th>Discount</Table.Th>
                                                        <Table.Th>Quantity</Table.Th>
                                                        <Table.Th>Subtotal</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {item.products.map((product, productIndex) => (
                                                        <Table.Tr key={productIndex}>
                                                            <Table.Td>{product.product_name}</Table.Td>
                                                            <Table.Td>{product.sku}</Table.Td>
                                                            <Table.Td>₦{product.cost}</Table.Td>
                                                            <Table.Td>{product.discount}</Table.Td>
                                                            <Table.Td>{product.quantity}</Table.Td>
                                                            <Table.Td>
                                                                ₦{((product.cost - product.discount) * product.quantity).toFixed(2)}
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            </Table>
                                            <Space h={20} />
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </React.Fragment>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                <Text c={`dimmed`} ta={`center`}>
                    No sales found
                </Text>
            )}
        </ScrollArea>
    );
});