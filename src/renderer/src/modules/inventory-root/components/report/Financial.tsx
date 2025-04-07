import { Button, Grid, Group, ScrollArea, Select, Stack, Table, TextInput, useMantineTheme, Text, Divider, Progress, RingProgress, Center, Loader, Title, Box, ActionIcon } from "@mantine/core";
import { POS_Report } from "@renderer/interface";
import { reportsLoader } from "@renderer/store/admin/reports";
import StatsCard from "@renderer/ui/common/cards/dashboard/StatsCards";
import classes from "./table.module.css"
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { reportPayload } from "@renderer/hooks/stats/useReportPayload";
import { MdArrowBack, MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import FinancialPrint from "./printouts/Sales";
import React from "react";

export default observer(function Financial_Report({ close }: { close: () => void }) {
    const { reportForm, loadPOSReportByPayload, loading } = reportPayload();
    const { start_date, end_date } = reportsLoader;
    const theme = useMantineTheme();
    const [pos, setPos] = useState<POS_Report | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const printRef = useRef<HTMLDivElement>(null);

    console.log(pos)

    useEffect(() => {
        setPos(reportsLoader.Pos_reports || {});
    }, [reportsLoader.Pos_reports]);

    useEffect(() => {
        reportForm.setFieldValue("period", "today".toLocaleUpperCase())
    }, [])

    const handlePrint = useReactToPrint({ contentRef: printRef });

    // Filtered data based on search query
    const filteredData = pos?.pos.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.customer?.toLowerCase().includes(query) ||
            item.store.name.toLowerCase().includes(query) ||
            item.payment_method.toLowerCase().includes(query) ||
            item.created_at.toLowerCase().includes(query)
        );
    });

    return (
        <Stack>
            <Group>
                <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                    <MdArrowBack size={40} fontWeight={600}/>
                </ActionIcon>
            </Group>
            <form
                onSubmit={reportForm.onSubmit(async () => {
                    await loadPOSReportByPayload();
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
                    <Title order={2}>Sales</Title>
                    <Grid grow>
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
                    </Grid>
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
                                        <Table.Th>Customer</Table.Th>
                                        <Table.Th>Store</Table.Th>
                                        <Table.Th>Payment Method</Table.Th>
                                        <Table.Th>Created At</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody className={classes.scrollableBody}>
                                    {filteredData?.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {/* Main Row */}
                                            <Table.Tr
                                                bg={theme.colors.blue[2]}
                                                className={classes.rowSpacing}
                                            >
                                                <Table.Td>
                                                    {item.customer
                                                        ? item.customer
                                                        : "Walk In Customer"}
                                                </Table.Td>
                                                <Table.Td>{item.store.name}</Table.Td>
                                                <Table.Td>{item.payment_method}</Table.Td>
                                                <Table.Td>
                                                    {item.created_at.slice(0, 10)}
                                                </Table.Td>
                                            </Table.Tr>

                                            {/* Nested Table for Products */}
                                            <Table.Tr>
                                                <Table.Td colSpan={5}>
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
                                                                <Table.Th>SKU</Table.Th>
                                                                <Table.Th>Cost</Table.Th>
                                                                <Table.Th>
                                                                    Discount
                                                                </Table.Th>
                                                                <Table.Th>
                                                                    Quantity
                                                                </Table.Th>
                                                                <Table.Th>
                                                                    Subtotal
                                                                </Table.Th>
                                                            </Table.Tr>
                                                        </Table.Thead>
                                                        <Table.Tbody>
                                                            {item.products.map(
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
                                                                            {product.sku}
                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            ₦
                                                                            {
                                                                                product.cost
                                                                            }
                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            {
                                                                                product.discount
                                                                            }
                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            {
                                                                                product.quantity
                                                                            }
                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            ₦
                                                                            {(
                                                                                (product.cost -
                                                                                    product.discount) *
                                                                                product.quantity
                                                                            ).toFixed(
                                                                                2
                                                                            )}
                                                                        </Table.Td>
                                                                    </Table.Tr>
                                                                )
                                                            )}
                                                        </Table.Tbody>
                                                    </Table>
                                                </Table.Td>
                                            </Table.Tr>
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
                <FinancialPrint ref={printRef} pos={pos} />
            </div>
        </Stack>
    );
});