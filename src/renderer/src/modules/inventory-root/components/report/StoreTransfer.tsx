import { Button, Grid, Group, ScrollArea, Select, Stack, Table, TextInput, useMantineTheme, Text, Divider, Progress, RingProgress, Center, Loader, Title, Box, ActionIcon } from "@mantine/core";
import { POS_Report, StoreTransferReport } from "@renderer/interface";
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
import StoreTransferPrint from "./printouts/StoreTransfer";

export default observer(function StoreTransfer_Report({ close }: { close: () => void }) {
    const { reportForm, loadStoreTransferReportByPayload, loading } = reportPayload();
    const { start_date, end_date } = reportsLoader;
    const theme = useMantineTheme();
    const [store_transfer, setStoreTransfer] = useState<StoreTransferReport[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const printRef = useRef<HTMLDivElement>(null);

    console.log(store_transfer)

    useEffect(() => {
        setStoreTransfer(reportsLoader.storeTransfer || []);
    }, [reportsLoader.storeTransfer]);

    useEffect(() => {
        reportForm.setFieldValue("period", "today".toLocaleUpperCase())
    }, [])

    const handlePrint = useReactToPrint({ contentRef: printRef });

    // Filtered data based on search query
    const filteredData = store_transfer.filter((item) => {
        const query = searchQuery.toLowerCase();

        // Check if any top-level fields match the query
        const topLevelMatch =
            item.from_store.toString().includes(query) ||
            item.to_store.toString().includes(query) ||
            item.transfer_date.toLowerCase().includes(query) ||
            item.created_at.toLowerCase().includes(query);

        // Check if any product fields match the query
        const productMatch = item.products.some((product) =>
            product.product_name.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toString().includes(query)
        );

        // Return true if either top-level fields or product fields match
        return topLevelMatch || productMatch;
    });

    return (
        <Stack>
            <Group>
                <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                    <MdArrowBack size={40} fontWeight={600} />
                </ActionIcon>
            </Group>
            <form
                onSubmit={reportForm.onSubmit(async () => {
                    await loadStoreTransferReportByPayload();
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
                    <Title order={2}>Store Transfer</Title>
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
                                        <Table.Th>ID</Table.Th>
                                        <Table.Th>From Store</Table.Th>
                                        <Table.Th>To Store</Table.Th>
                                        <Table.Th>Quantity</Table.Th>
                                        <Table.Th>Transfer Date</Table.Th>
                                        <Table.Th>Created At</Table.Th>
                                        <Table.Th>Updated At</Table.Th>
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
                                                    {item.id}
                                                </Table.Td>
                                                <Table.Td>{item.from_store}</Table.Td>
                                                <Table.Td>{item.to_store}</Table.Td>
                                                <Table.Td>
                                                    {item.quantity}
                                                </Table.Td>
                                                <Table.Td>
                                                    {item.transfer_date.slice(0, 10)}
                                                </Table.Td>
                                                <Table.Td>
                                                    {item.created_at.slice(0, 10)}
                                                </Table.Td>
                                                <Table.Td>
                                                    {item.updated_at.slice(0, 10)}
                                                </Table.Td>
                                            </Table.Tr>

                                            {/* Nested Table for Products */}
                                           
                                            <Table.Tr>
                                                <Table.Td colSpan={7}>
                                                <Text ta={`center`} fw={`bold`} c={`dimmed`} mt={`sm`}>Transfered Products</Text>
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
                                                                    Category
                                                                </Table.Th>
                                                                <Table.Th>
                                                                    Selling Price
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
                                                                                product.cost_price
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
                                                                            {product.category}
                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            ₦
                                                                            {product.selling_price}
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
                <StoreTransferPrint ref={printRef} storeTransfers={store_transfer} />
            </div>
        </Stack>
    );
});