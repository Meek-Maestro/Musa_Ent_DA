import { Box, Button, Group, Text, Select, Paper, Grid, useMantineTheme, ActionIcon } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import Cart from "../../components/pos/Cart";
import { useInvoice } from "@renderer/hooks/use.Invoice";
import { MdArrowBack, MdClose, MdCreditCard, } from "react-icons/md";
import Brands from "../../components/pos/Brands";
import { IoCash } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { ProductStore } from "@renderer/store/admin/stores";
import { cartController } from "@renderer/store/cart";
import { useReactToPrint } from "react-to-print";
import POSPrint from "../../components/pos/PosPrint";
import { BiLogoBlender } from "react-icons/bi";
import { useRecentTransactions } from "@renderer/hooks/by-modules/use.RecentTransactions";
import { useExpenses } from "@renderer/hooks/by-modules/use.Expenses";
import { useNavigate } from "react-router-dom";


const POS = observer(() => {
    const { startopenRecentOperation } = useRecentTransactions()
    const { startAddExpenseOperation } = useExpenses()
    const theme = useMantineTheme();
    const [store, setStore] = useState<any[]>([]);
    const { createInvoice, invoice_form, submiting } = useInvoice();
    const printRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    useEffect(() => {
        setStore(ProductStore.stores || []);
    }, [ProductStore.stores]);


    const handlePrint = useReactToPrint({ contentRef: printRef });
    const handlePrint2 = async () => {
        if (!window.api) {
            console.error("Electron IPC not available!");
            return;
        }

        try {
            //@ts-ignore
            const result = await window.api.invoke('print-receipt', cartController.getValues());
            if (result.success) {
                alert('Receipt printed successfully!');
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Printing error:', error);
        }
    };
    function confirmPrint() {
        if (window.confirm("Do you want to print the invoice?")) {
            handlePrint2();
        } else {
            console.log("User canceled the print action.");
        }
    }

    return (
        <AppPageWrapper title={`POS`} right={<UserButton />}>
            <Group mb={`sm`}>
                <ActionIcon size={`lg`} radius={`xl`} variant="subtle" bg={`inherit`} c={`gray`} onClick={()=>navigate("/")} bd={`2px solid`}>
                    <MdArrowBack size={40} fontWeight={600} />
                </ActionIcon>
            </Group>
            <form
                onSubmit={invoice_form.onSubmit(async () => {
                    if (cartController.products.length === 0) {
                        alert("No products in the cart");
                        return;
                    }
                    if (await createInvoice()) {
                        confirmPrint()
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
                            <Button onClick={startAddExpenseOperation}>Add Expense</Button>
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
                                    disabled={submiting && cartController.payment_method !== "cash"}
                                    loading={submiting && cartController.payment_method === "cash"}
                                >
                                    Cash
                                </Button>
                                <Button
                                    leftSection={<MdCreditCard size={20} />}
                                    type="submit"
                                    disabled={submiting && cartController.payment_method !== "transfer"}
                                    loading={submiting && cartController.payment_method === "transfer"}
                                    onClick={() => {
                                        cartController.setPaymentMethod("transfer");
                                    }}
                                >
                                    Transfer
                                </Button>
                                <Button
                                    leftSection={<BiLogoBlender size={20} />}
                                    disabled={submiting && cartController.payment_method !== "credit"}
                                    loading={submiting && cartController.payment_method === "credit"}
                                    type="submit"
                                    onClick={() => {
                                        cartController.setPaymentMethod("credit");
                                    }}
                                >
                                    Credit
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
                            <Button radius={`xl`} leftSection={<FaClock />} onClick={startopenRecentOperation}>
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