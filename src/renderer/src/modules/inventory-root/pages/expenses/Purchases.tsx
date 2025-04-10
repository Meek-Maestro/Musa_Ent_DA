import { ActionIcon, Badge, Box, Button, Group, Input, Loader, Paper, Stack, Text } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import { FaFilter } from "react-icons/fa6";
import { MdRefresh, MdSearch } from "react-icons/md";
import classes from "./index.module.css"
import { defaultColors } from "../../../../ui/constants/constants";
import { usePurchase } from "../../../../hooks/by-modules/use.Purchases";
import { useNavigate } from "react-router-dom";
import PurchaseTable from "../../../../ui/organisms/data-table/purchase-table/PurchaseTable";
import { useState } from "react";
import { useConfirm } from "../../../../hooks/common/use.Confirm.Modals";
import { purchaseStore } from "@renderer/store/admin/purchase";

function Expenses() {

    const [filterText, setFilterText] = useState("");
    const [selectedExpense, setSelectedExpense] = useState<any>({})
    const { deletePurchase, ReloadPurchases, submitting } = usePurchase()
    const { confirmDelete } = useConfirm()
    const navigate = useNavigate()

    const handleConfirmDelete = () => {
        if (selectedExpense) {
            confirmDelete(() => deletePurchase(selectedExpense.id), "", "Are you sure you want to delete this purchase?")
            setSelectedExpense({})
        }
    }
    const handleEdit = () => {
        if (selectedExpense) {
            navigate(`/edit-purchase/${selectedExpense.id}`)
            setSelectedExpense({})
        }
    }
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };
    return (
        <AppPageWrapper title={"Purchase"} right={<UserButton />}>
            <Group p={`sm`}>
                <ActionIcon title="Refresh Customers table" variant="subtle" onClick={() => {
                    ReloadPurchases()
                }}>
                    <MdRefresh size={30} />
                </ActionIcon>
                <Badge p={`sm`}>
                    <Text size={`sm`}>{purchaseStore.purchases.length} Purchases</Text>
                </Badge>
            </Group>
            <Box>
                <Paper p={`xl`} radius={`md`}>
                    <Group justify="space-between">
                        <Input
                            className={classes.input}
                            styles={{}}
                            size="lg"
                            leftSection={<MdSearch size={30} />}
                            rightSection={<FaFilter size={25} />}
                            value={filterText}
                            onChange={handleFilterChange}
                        />
                        <Group>
                            <Button color={defaultColors.lightGreen} onClick={() => navigate("/purchases")}>Add Purchase</Button>
                            <Button disabled={Object.keys(selectedExpense).length === 0} color={defaultColors.limeColor} onClick={handleEdit}>Edit Purchase</Button>
                            <Button disabled={Object.keys(selectedExpense).length === 0} color={defaultColors.darkRed} onClick={handleConfirmDelete}>Delete Purchase</Button>
                            <Button color={defaultColors.darkRed} onClick={() => navigate("/damaged-goods")}>Damaged Goods</Button>
                            <Button>Export</Button>
                        </Group>
                    </Group>
                </Paper>
                {submitting && (
                    <Group justify="center" pos={`fixed`} left={50} right={50} top={25} h={`100vh`}
                        color="black" w={`100vw`} style={{ zIndex: 100, backgroundColor: "rgb(0, 0, 0, 0.1)" }}>
                        <Stack justify="center" align="center">
                            {<Loader />}
                            <Text size="lg" ta={`center`} fw={`600`}>Refreshing...</Text>
                        </Stack>
                    </Group>
                )}
                <PurchaseTable onselect={setSelectedExpense} filterText={filterText} />
            </Box>
        </AppPageWrapper>
    );
}

export default Expenses;