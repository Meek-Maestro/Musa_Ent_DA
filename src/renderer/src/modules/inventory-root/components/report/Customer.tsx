import { ActionIcon, Box, Button, Center, Divider, Group, Loader, ScrollArea, Select, Text, Stack, Table, Title, useMantineTheme } from "@mantine/core";
import { customerStore } from "@renderer/store/admin/customers";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdPrint } from "react-icons/md";
import classes from "./table.module.css"
import { useForm } from "@mantine/form";
import { reportsLoader } from "@renderer/store/admin/reports";
import { reportPayload } from "@renderer/hooks/stats/useReportPayload";
import { CustomerReport } from "@renderer/interface";
import { useReactToPrint } from "react-to-print";
import CustomerPrint from "./printouts/Customer";

interface props {
    close: () => void
}

interface formProps {
    credit_filter: string
    customer_id: string | number
}

export default observer(function CustomerRep({ close }: props) {
    const { loading, loadCustomerByPayload } = reportPayload()
    const theme = useMantineTheme()
    const form = useForm<formProps>({
        initialValues: {
            credit_filter: "",
            customer_id: 0
        }
    })
    const [customers, setCustomers] = useState<CustomerReport[]>([])
    const printRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({ contentRef: printRef });

    useEffect(() => {
        setCustomers(reportsLoader.customer || [])
    }, [reportsLoader.customer])
    return (
        <>
            <Stack>
                <Group>
                    <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={close} bd={`2px solid`}>
                        <MdArrowBack size={40} fontWeight={600} />
                    </ActionIcon>
                </Group>
                <Title order={2}>Customer Report</Title>

                <form
                    onSubmit={form.onSubmit(async () => {
                        await loadCustomerByPayload(form.values);
                    })}
                >
                    <Group gap={`sm`} align="center">
                        <Text>Period</Text>
                        <Select
                            {...form.getInputProps("credit_filter")}
                            defaultValue={"today".toUpperCase()}
                            data={[
                                "lt".toUpperCase(),
                                "gt".toLocaleUpperCase(),
                                "eq".toLocaleUpperCase(),
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

                        <Select
                            radius={0}
                            placeholder="Select Customer *Optional*"
                            data={customerStore.customers.map((data) => ({
                                label: data.customer_name.toString(),
                                value: data.id.toString(),
                            }))}
                            {...form.getInputProps("customer_id")}
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
                                    <Table.Th>Customer Name</Table.Th>
                                    <Table.Th>Phone Number</Table.Th>
                                    <Table.Th>Balance</Table.Th>
                                    <Table.Th>Credit Limit</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody className={classes.scrollableBody}>
                                {customers.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <Table.Tr
                                            className={classes.rowSpacing} bg={theme.colors.gray[3]}
                                        >
                                            <Table.Td>
                                                {item.id}
                                            </Table.Td>
                                            <Table.Td>{item.customer_name}</Table.Td>
                                            <Table.Td>{item.phone_number}</Table.Td>
                                            <Table.Td>{item.balance}</Table.Td>
                                            <Table.Td>{item.credit_limit}</Table.Td>

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
                    <CustomerPrint ref={printRef} customers={customers} />
                </div>
            </Stack>
        </>
    )
})