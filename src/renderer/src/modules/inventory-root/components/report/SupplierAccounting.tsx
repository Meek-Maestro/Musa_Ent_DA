import { Group, Select, TextInput, Button, Divider, Text, useMantineTheme, Stack, ActionIcon, Title, Center, Loader, ScrollArea, Space, Table } from "@mantine/core";
import {  SupplierAccounting } from "@renderer/interface";
import { reportsLoader } from "@renderer/store/admin/reports";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdPrint } from "react-icons/md";
import classes from "./table.module.css"
import { reportPayload } from "@renderer/hooks/stats/useReportPayload";
import { useForm } from "@mantine/form";
import { SupplierStore } from "@renderer/store/admin/suppliers";
import { useReactToPrint } from "react-to-print";
import SupplierAccountingPrint from "./printouts/SupplierAcc";

interface props {
    close: () => void
}

interface formProps { period: string, end_date: string, start_date: string, supplier_id?: number }

export default observer(function SupplierAccouting({ close }: props) {
    const { loading, loadSupplierAccountingPayload } = reportPayload()
    const date = new Date().toISOString().slice(0, 10)
    const form = useForm<formProps>({
        initialValues: {
            period: "today",
            end_date: date,
            start_date: date,
            supplier_id: 0
        }
    })
    const theme = useMantineTheme()
    const [supplierAccounting, setSupplierAccounting] = useState<SupplierAccounting[]>([])
    useEffect(() => {
        setSupplierAccounting(reportsLoader.supplierAccounting || [])
    }, [reportsLoader.supplierAccounting])
    const printRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({ contentRef: printRef });

    return (
        <>
            <Stack>
                <Group>
                    <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                        <MdArrowBack size={40} fontWeight={600} />
                    </ActionIcon>
                </Group>
                <Title order={2}>Supplier Accounting Report</Title>

                <form
                    onSubmit={form.onSubmit(async () => {
                        await loadSupplierAccountingPayload(form.values);
                    })}
                >
                    <Group gap={`sm`} align="center">
                        <Text>Period</Text>
                        <Select
                            {...form.getInputProps("period")}
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

                        {form.values?.period === "custom".toLocaleUpperCase() && (
                            <>
                                <Text>From</Text>
                                <TextInput
                                    {...form.getInputProps("start_date")}

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
                                    {...form.getInputProps("end_date")}
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
                            </>
                        )}

                        <Select
                            radius={0}
                            placeholder="Select Supplier *Optional*"
                            data={SupplierStore.suppliers.map((data) => ({
                                label: data.supplier_name.toString(),
                                value: data.id.toString(),
                            }))}
                            {...form.getInputProps("supplier_id")}

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
                        </Group>
                        <Table striped highlightOnHover className={classes.table}>
                            <Table.Thead className={classes.stickyHeader}>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Supplier Name</Table.Th>
                                    <Table.Th>Phone Number</Table.Th>
                                    <Table.Th>Balance</Table.Th>
                                    <Table.Th>Credit Limit</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody className={classes.scrollableBody}>
                                {supplierAccounting.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <Table.Tr
                                            className={classes.rowSpacing} bg={theme.colors.gray[3]}
                                        >
                                            <Table.Td>
                                                {item.id}
                                            </Table.Td>
                                            <Table.Td>{item.supplier_name}</Table.Td>
                                            <Table.Td>{item.phone_number}</Table.Td>
                                            <Table.Td>{item.balance}</Table.Td>
                                            <Table.Td>{item.credit_limit}</Table.Td>

                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td colSpan={6}>
                                                <Text ta={`center`} fw={`bold`} c={`dimmed`} mt={`sm`}>Accounting</Text>
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
                                                                ID
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Payment Date
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Payment Method
                                                            </Table.Th>
                                                            <Table.Th>Amount Paid</Table.Th>
                                                            <Table.Th>Received By</Table.Th>
                                                            <Table.Th>Memo</Table.Th>
                                                        </Table.Tr>
                                                    </Table.Thead>
                                                    <Table.Tbody>
                                                        {item.accounting.map(
                                                            (
                                                                accounting,
                                                                accountIndex
                                                            ) => (

                                                                <Table.Tr
                                                                    key={
                                                                        accountIndex

                                                                    }
                                                                >
                                                                    <Table.Td>
                                                                        {
                                                                            accounting.id
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            accounting.payment_date
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {accounting.payment_method}
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            accounting.amount_paid
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            accounting.received_by
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            accounting.memo
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
                    <SupplierAccountingPrint ref={printRef} supplierAccounting={supplierAccounting} />
                </div>
            </Stack>
        </>
    )
})