import { Stack, Group, 
    ActionIcon, 
    Select, TextInput, Text, Button, 
    Divider, Center, Loader, Title, 
    Box, ScrollArea, Table, useMantineTheme, Space } from "@mantine/core";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdPrint } from "react-icons/md";
import { reportPayload } from "@renderer/hooks/stats/useReportPayload";
import { reportsLoader } from "@renderer/store/admin/reports";
import { Purchase } from "@renderer/interface";
import classes from "./table.module.css"
import { PurchasePrint } from "./printouts/Purchase";
import { useReactToPrint } from "react-to-print";

interface props {
    close: () => void
}

export default observer(function PurchaseReport({ close }: props) {
    const theme = useMantineTheme()
    const { reportForm, loadPurchaseReportByPayload, loading } = reportPayload()
    const { start_date, end_date } = reportsLoader;
    const [searchQuery, setSearchQuery] = useState("");

    const [purchase, setPurchase] = useState<Purchase[]>([])
    const printRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        setPurchase(reportsLoader.purchase || [])
    }, [reportsLoader.purchase])

    const filteredData = purchase?.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.supplier_address?.toLowerCase().includes(query) ||
            item.supplier_name.toLowerCase().includes(query) ||
            item.payment_terms.toLowerCase().includes(query) ||
            item.id.toLowerCase().includes(query)
        );
    });
    const handlePrint = useReactToPrint({ contentRef: printRef });
    return (
        <>
            <Stack>
                <Group>
                    <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                        <MdArrowBack size={40} fontWeight={600} />
                    </ActionIcon>
                </Group>
                <form
                    onSubmit={reportForm.onSubmit(async () => {
                        await loadPurchaseReportByPayload();
                    })}
                >
                    <Group gap={`sm`} align="center">
                        <Text>Period</Text>
                        <Select
                            {...reportForm.getInputProps("period")}
                            defaultValue={"today".toUpperCase()}
                            data={[
                                "today".toUpperCase(),
                                "this_week".toLocaleUpperCase().replace("_", " "),
                                "this_month".toUpperCase().replace("_", " "),
                                "week".toUpperCase(),
                                "full".toUpperCase(),
                                "custom".toUpperCase(),
                            ]}
                            variant="filled"
                            styles={{
                                input: {
                                    border: `1px solid ${theme.colors.gray[2]}`,
                                    borderRadius: 0,
                                    background: theme.colors.gray[4],
                                    fontWeight: 600,
                                    color: "white",
                                },
                                dropdown: {
                                    backgroundColor: theme.colors.gray[4],
                                    color: "white",
                                    fontWeight: 600,
                                },
                            }}
                        />
                        <Text>From</Text>
                        <TextInput
                            {...reportForm.getInputProps("start_date")}
                            defaultValue={start_date}
                            variant="filled"
                            styles={{
                                input: {
                                    border: `1px solid ${theme.colors.gray[2]}`,
                                    borderRadius: 0,
                                    background: theme.colors.gray[4],
                                    fontWeight: 600,
                                    color: "white",
                                },
                            }}
                            type="date"
                        />
                        <Text>To</Text>
                        <TextInput
                            {...reportForm.getInputProps("end_date")}
                            defaultValue={end_date}
                            variant="filled"
                            styles={{
                                input: {
                                    border: `1px solid ${theme.colors.gray[2]}`,
                                    borderRadius: 0,
                                    background: theme.colors.gray[4],
                                    fontWeight: 600,
                                    color: "white",
                                },
                            }}
                            type="date"
                        />
                        <Button
                            variant="subtle"
                            type="submit"
                            c={`white`}
                            fw={500}
                            bg={theme.colors.blue[3]}
                        >
                            Generate
                        </Button>
                    </Group>
                    <Divider my={`sm`} />
                </form>
                {loading ? (
                    <Stack>
                        <Center>
                            <Loader size={"xl"} />
                        </Center>
                        <Text ta={"center"} c={`dimmed`}>
                            Processing request
                        </Text>
                    </Stack>
                ) : (
                    <>
                        <Title order={2}>Purchase</Title>
                        {/* <Grid grow>
                                <Grid.Col span={2}>
                                    <StatsCard.StatsCardVert
                                        value={`₦${pos?.total_sales.toString()}`}
                                        label="Total Sales"
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <StatsCard.StatsCardVert
                                        value={`${pos?.products_sold.toString()}`}
                                        label="Products Sold"
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <StatsCard.StatsCardVert
                                        value={`%${pos?.profit_margin.toString()}`}
                                        label="Profit Margin"
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <StatsCard.StatsCardVert
                                        value={`${pos?.customers.toString()}`}
                                        label="Customers"
                                    />
                                </Grid.Col>
                            </Grid> */}
                        <Box bg={`white`}>
                            <Group p={`sm`}>
                                <Button
                                    size="sm"
                                    style={{ marginLeft: "auto" }}
                                    variant="subtle"
                                    type="submit"
                                    c={`white`}
                                    fw={500}
                                    bg={theme.colors.blue[4]}
                                    leftSection={<MdPrint size={20} />}
                                onClick={() => handlePrint()}
                                >
                                    Print
                                </Button>
                                <TextInput
                                    size="sm"
                                    placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                />
                            </Group>
                            <ScrollArea
                                h={`50vh`}
                                style={{ borderTop: `1px solid ${theme.colors.gray[2]}` }}
                            >
                                <Table striped highlightOnHover className={classes.table}>
                                    <Table.Thead className={classes.stickyHeader}>
                                        <Table.Tr>
                                            <Table.Th>Id</Table.Th>
                                            <Table.Th>Status</Table.Th>
                                            <Table.Th>Arrival Date</Table.Th>
                                            <Table.Th>Supplier Name</Table.Th>
                                            <Table.Th>Supplier Address</Table.Th>
                                            <Table.Th>Supplier Contact</Table.Th>
                                            <Table.Th>Payment Terms</Table.Th>
                                            <Table.Th>Purchase Items Total</Table.Th>
                                            <Table.Th>Damaged Items Total</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody className={classes.scrollableBody}>
                                        {filteredData.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {/* Main Row */}
                                                <Table.Tr
                                                    bg={theme.colors.blue[2]}
                                                    className={classes.rowSpacing}
                                                >
                                                    <Table.Td>
                                                        {item.purchase_gen_id}
                                                    </Table.Td>
                                                    <Table.Td>{item.status}</Table.Td>
                                                    <Table.Td>{item.arrival_date}</Table.Td>
                                                    <Table.Td>
                                                        {item.supplier_name}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {item.supplier_address}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {item.supplier_contact}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {item.payment_terms}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {item.purchase_items_total}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {item.damage_items_total}
                                                    </Table.Td>
                                                </Table.Tr>

                                                {/* Nested Table for Products */}
                                                <Table.Tr>
                                                    <Table.Td colSpan={9}>
                                                        <Text ta={`center`} fw={`bold`} c={`dimmed`} mt={`sm`}>Purchased Items</Text>
                                                        <Divider />
                                                        <Space h={10} />
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
                                                                    <Table.Th>
                                                                        Product Name
                                                                    </Table.Th>
                                                                    <Table.Th>Unit Price</Table.Th>
                                                                    <Table.Th>Cost</Table.Th>
                                                                    <Table.Th>
                                                                        Quantity
                                                                    </Table.Th>
                                                                    <Table.Th>
                                                                        Discount
                                                                    </Table.Th>
                                                                    <Table.Th>
                                                                        Total
                                                                    </Table.Th>
                                                                </Table.Tr>
                                                            </Table.Thead>
                                                            <Table.Tbody>
                                                                {item.purchase_items.map(
                                                                    (
                                                                        product,
                                                                        productIndex
                                                                    ) => (
                                                                        <Table.Tr
                                                                            key={
                                                                                productIndex
                                                                            }
                                                                        >
                                                                            <Table.Td>
                                                                                {
                                                                                    product.product_name
                                                                                }
                                                                            </Table.Td>
                                                                            <Table.Td>
                                                                                {product.unit_price}
                                                                            </Table.Td>
                                                                            <Table.Td>
                                                                                {
                                                                                    product.quantity
                                                                                }
                                                                            </Table.Td>
                                                                            <Table.Td>
                                                                                {
                                                                                    product.discount
                                                                                }
                                                                            </Table.Td>
                                                                            <Table.Td>
                                                                                {
                                                                                    product.total
                                                                                }
                                                                            </Table.Td>
                                                                        </Table.Tr>
                                                                    )
                                                                )}
                                                            </Table.Tbody>
                                                        </Table>
                                                    </Table.Td>
                                                </Table.Tr>
                                                {item.damage_items.length > 0 && (
                                                    <Table.Tr>
                                                        <Table.Td colSpan={9}>
                                                            <Text ta={`center`} fw={`bold`} c={`red`} variant="subtle" mt={`sm`}>Damaged Items</Text>
                                                            <Divider />
                                                            <Space h={10} />
                                                            <Table
                                                                style={{
                                                                    borderLeft: `5px solid ${theme.colors.red[3]}`,
                                                                }}
                                                                striped
                                                                highlightOnHover
                                                                withColumnBorders
                                                            >
                                                                <Table.Thead>
                                                                    <Table.Tr>
                                                                        <Table.Th>
                                                                            Product Name
                                                                        </Table.Th>
                                                                        <Table.Th>Unit Price</Table.Th>
                                                                        <Table.Th>Cost</Table.Th>
                                                                        <Table.Th>
                                                                            Quantity
                                                                        </Table.Th>
                                                                        <Table.Th>
                                                                            Discount
                                                                        </Table.Th>
                                                                        <Table.Th>
                                                                            Total
                                                                        </Table.Th>
                                                                    </Table.Tr>
                                                                </Table.Thead>
                                                                <Table.Tbody>
                                                                    {item.damage_items.map(
                                                                        (
                                                                            product,
                                                                            productIndex
                                                                        ) => (
                                                                            <Table.Tr
                                                                                key={
                                                                                    productIndex
                                                                                }
                                                                            >
                                                                                <Table.Td>
                                                                                    {
                                                                                        product.product_name
                                                                                    }
                                                                                </Table.Td>
                                                                                <Table.Td>
                                                                                    {product.unit_price}
                                                                                </Table.Td>
                                                                                <Table.Td>
                                                                                    {
                                                                                        product.quantity
                                                                                    }
                                                                                </Table.Td>
                                                                                <Table.Td>
                                                                                    {
                                                                                        product.discount
                                                                                    }
                                                                                </Table.Td>
                                                                                <Table.Td>
                                                                                    {
                                                                                        product.total
                                                                                    }
                                                                                </Table.Td>
                                                                            </Table.Tr>
                                                                        )
                                                                    )}
                                                                </Table.Tbody>
                                                            </Table>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Box>
                    </>
                )}
                {/* Hidden Printable Component */}
                <div style={{ display: "none" }}>
                        <PurchasePrint ref={printRef} purchase={purchase} />
                    </div>
            </Stack>
        </>
    )
})