import { Box, Button, Group, TextInput, Text, Select, Paper, ActionIcon, Grid, useMantineTheme } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import Cart from "../../components/pos/Cart";
import { useInvoice } from "@renderer/hooks/use.Invoice";
import { MdAdd, MdCreditCard, MdPerson, MdSearch } from "react-icons/md";
import Brands from "../../components/pos/Brands";
import { IoCash } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ProductStore } from "@renderer/store/admin/stores";


const POS = observer(() => {
    const theme = useMantineTheme();
    const [store, setStore] = useState<any[]>([])
    const { createInvoice } = useInvoice()

    useEffect(() => {
        setStore(ProductStore.stores || [])
    }, [ProductStore.stores])
    console.log(store[0]?.name.toString())
    return (
        <AppPageWrapper title={`POS`} right={<UserButton />}>
            <form>
                <Box>
                    <Paper p={`md`} shadow="sm">
                        <Group justify="space-between">
                            <Group>
                                <Text>Location:</Text>
                                <Select defaultValue={store[0]?.name.toString()} data={store.map((data: any) => ({ label: data.name.toString(), value: data.id.toString() }))} />
                            </Group>
                            <Button>Add Expense</Button>
                        </Group>
                    </Paper>
                    <Grid mt={`md`}>
                        <Grid.Col span={7}>
                            <Paper>
                                <Group>
                                    <Group m={`0px`} gap={0} p={`sm`}>
                                        <MdPerson size={30} />
                                        <Select defaultValue={"Walk In Customer"} data={["Walk In Customer", "Hello"]} radius={0} styles={{ input: { height: "40px" } }} />
                                        <ActionIcon radius={0} h={`40px`} onClick={() => alert("Yo")}>
                                            <MdAdd />
                                        </ActionIcon>
                                    </Group>
                                    <Group m={`0px`} gap={0}>
                                        <MdSearch size={20} />
                                        <TextInput placeholder="Enter Product name / SKU" radius={0} styles={{ input: { height: "40px", width: "330px" } }} />
                                        <ActionIcon radius={0} h={`40px`} onClick={() => alert("Yo")}>
                                            <MdAdd />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                                <Cart />
                            </Paper>
                        </Grid.Col>

                        <Grid.Col span={5}>
                            <Paper bg={theme.colors.gray[1]} p={`xs`}>
                                <Brands />
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Box>
                <Paper p={`md`}>
                    <Group justify="space-between">
                        <Group style={{ gap: 10 }}>
                            <Button bg={`green`} leftSection={<IoCash size={20} />}>Cash</Button>
                            <Button leftSection={<MdCreditCard size={20} />}>Transfer</Button>
                        </Group>
                        <Button radius={`xl`} leftSection={<FaClock />}>Recent Transaction</Button>
                    </Group>
                </Paper>
            </form>
        </AppPageWrapper>
    );
});

export default POS