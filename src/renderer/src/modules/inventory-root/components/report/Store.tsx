import { Group, useMantineTheme, ActionIcon, Table, ScrollArea, Stack, Badge, Divider, Space, Text, Select, Center, Loader, Button, Title } from "@mantine/core";
import { reportsLoader } from "@renderer/store/admin/reports";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdFilter, MdPrint } from "react-icons/md";
import classes from "./table.module.css"
import { storeReport } from "@renderer/interface";
import StatsCard from "@renderer/ui/common/cards/dashboard/StatsCards";
import { BiFilter } from "react-icons/bi";
import { ProductStore } from "@renderer/store/admin/stores";
import { reportPayload } from "@renderer/hooks/stats/useReportPayload";
import { StockReportPrint } from "./printouts/StockReport";
import { useReactToPrint } from "react-to-print";
interface props {
    close: () => void
}

export default observer(function StoreReport({ close }: props) {
    const { loadStoreReportByPayload, loading } = reportPayload()
    const theme = useMantineTheme()
    const [store, setStore] = useState<storeReport[]>([])
    const printRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({ contentRef: printRef });
    useEffect(() => {
        setStore(reportsLoader.store || [])
    }, [reportsLoader.store])

    function loadDynamiChips(level: string) {
        if (level == "Low") return <Badge color="red" variant="filled">{level}</Badge>
        if (level == "High") return <Badge defaultChecked color="green" variant="filled">{level}</Badge>
        return <Badge color="gray" defaultChecked variant="filled">{level}</Badge>;
    }
    return (
        <>
            <Stack>
                <Group>
                    <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                        <MdArrowBack size={40} fontWeight={600} />
                    </ActionIcon>
                </Group>
                <Title order={2}>Store Report</Title>

                <Group>
                    <Group>
                        <Text>Filter Store by name</Text>
                        <Select
                            defaultValue={`All Stores`}
                            data={["All Stores", ...ProductStore.stores.map((data) => data.name)]}
                            onChange={(value) => {
                                if (value && value !== "All Stores") {
                                    loadStoreReportByPayload(value);
                                } else {
                                    loadStoreReportByPayload("");
                                }
                            }}
                            leftSection={<BiFilter size={20} />}
                            w={`200px`}
                        />
                    </Group>
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
                </Group>

                <Divider />
                <Stack w={`30%`}>
                    <StatsCard.StatsCardVert
                        value={`${store.length}`}
                        label="Total Stores"
                    />
                </Stack>
                {loading ? (<Stack>
                    <Center>
                        <Loader size={"xl"} />
                    </Center>
                    <Text ta={"center"} c={`dimmed`}>
                        Processing request
                    </Text>
                </Stack>) : (
                    <ScrollArea
                        h={`70vh`}
                        style={{ borderTop: `1px solid ${theme.colors.gray[2]}` }}
                    >
                        <Table striped highlightOnHover className={classes.table}>
                            <Table.Thead className={classes.stickyHeader}>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Store Name</Table.Th>
                                    <Table.Th>Location</Table.Th>
                                    <Table.Th>Store Keeper</Table.Th>
                                    <Table.Th>Total Products</Table.Th>
                                    <Table.Th>Stock Level</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody className={classes.scrollableBody}>
                                {store.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <Table.Tr
                                            className={classes.rowSpacing} bg={theme.colors.gray[3]}
                                        >
                                            <Table.Td>
                                                {item.id}
                                            </Table.Td>
                                            <Table.Td>{item.name}</Table.Td>
                                            <Table.Td>{item.location}</Table.Td>
                                            <Table.Td>{item.store_keeper ? item.store_keeper : "NIL"}</Table.Td>
                                            <Table.Td>{item.stock_report.total_products}</Table.Td>
                                            <Table.Td>
                                                {loadDynamiChips(item.stock_report.stock_level)}
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td colSpan={9}>
                                                <Text ta={`center`} fw={`bold`} c={`dimmed`} mt={`sm`}>Products</Text>
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
                                                            <Table.Th>
                                                                Sku
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Quantity
                                                            </Table.Th>
                                                            <Table.Th>Low stock alert</Table.Th>
                                                            <Table.Th>Selling Price</Table.Th>
                                                            <Table.Th>Cost Price</Table.Th>
                                                            <Table.Th>Discount</Table.Th>
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
                                                                        {
                                                                            product.sku
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {product.quantity}
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.quantity_alert
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.selling_price
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.cost_price
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            product.discount
                                                                        }
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
                            <Table.Tr>

                            </Table.Tr>
                        </Table>
                    </ScrollArea>
                )}
                {/* Hidden Printable Component */}
                <div style={{ display: "none" }}>
                    <StockReportPrint ref={printRef} store={store} />
                </div>
            </Stack>
        </>
    )
})