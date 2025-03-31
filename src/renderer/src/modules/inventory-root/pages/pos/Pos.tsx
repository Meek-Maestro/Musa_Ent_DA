import { Box, Button, Group, Text, Select, Paper, Grid, useMantineTheme } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import Cart from "../../components/pos/Cart";
import { useInvoice } from "@renderer/hooks/use.Invoice";
import { MdClose, MdCreditCard, } from "react-icons/md";
import Brands from "../../components/pos/Brands";
import { IoCash } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { ProductStore } from "@renderer/store/admin/stores";
import { cartController } from "@renderer/store/cart";
import { useReactToPrint } from "react-to-print";
import POSPrint from "../../components/pos/PosPrint";


const POS = observer(() => {
    const theme = useMantineTheme();
    const [store, setStore] = useState<any[]>([]);
    const { createInvoice, invoice_form, submiting } = useInvoice();
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setStore(ProductStore.stores || []);
    }, [ProductStore.stores]);


    const handlePrint = useReactToPrint({ contentRef: printRef });

    return (
        <AppPageWrapper title={`POS`} right={<UserButton />}>
            <form
                onSubmit={invoice_form.onSubmit(async () => {
                    if (await createInvoice()) {
                        handlePrint()
                        cartController.cancelTransaction()
                    }
                })}
            >
                <Box>
                    <Paper p={`md`} shadow="sm">
                        <Group justify="space-between">
                            <Group>
                                <Text>Location:</Text>
                                <Select
                                    defaultValue={store[0]?.name.toString()}
                                    data={store.map((data: any) => ({
                                        label: data.name.toString(),
                                        value: data.id.toString(),
                                    }))}
                                />
                            </Group>
                            <Button>Add Expense</Button>
                        </Group>
                    </Paper>
                    <Grid mt={`md`}>
                        <Grid.Col span={7}>
                            <Paper>
                                <Cart />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <Paper bg={theme.colors.gray[1]} p={`xs`}>
                                <Brands />
                            </Paper>
                        </Grid.Col>
                    </Grid>
                    <Paper p={`md`}>
                        <Group justify="space-between">
                            <Group style={{ gap: 10 }}>
                                <Button
                                    bg={`green`}
                                    leftSection={<IoCash size={20} />}
                                    type="submit"
                                    onClick={() => {
                                        cartController.setPaymentMethod("cash");
                                    }}
                                    loading={submiting && cartController.payment_method ==="cash"}
                                >
                                    Cash
                                </Button>
                                <Button
                                    leftSection={<MdCreditCard size={20} />}
                                    type="submit"

                                    onClick={() => {
                                        cartController.setPaymentMethod("transfer");
                                    }}
                                >
                                    Transfer
                                </Button>
                                <Button
                                    type="submit"
                                    leftSection={<MdClose size={20} />}
                                    bg={`red`}
                                    onClick={() => cartController.cancelTransaction()}
                                >
                                    Cancel
                                </Button>
                            </Group>
                            <Button radius={`xl`} leftSection={<FaClock />}>
                                Recent Transaction
                            </Button>
                        </Group>
                    </Paper>
                </Box>
                <div style={{ display: "none" }}>
                    <POSPrint ref={printRef} />
                </div>
            </form>
        </AppPageWrapper>
    );
});

export default POS;