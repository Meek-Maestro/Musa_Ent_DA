import { Box, Button, Grid, Group, LoadingOverlay, Paper, RingProgress, ScrollArea, SimpleGrid, Text, UnstyledButton, useMantineTheme } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import { defaultColors } from "../../../../ui/constants/constants"
import { useNavigate } from "react-router-dom"
import StatsCard from "@renderer/ui/common/cards/dashboard/StatsCards"
import { useSummary } from "@renderer/hooks/stats/useInventorySummary"
import { ProductStore } from "@renderer/store/admin/stores"
import { useState } from "react"
import RecentSalesTable from "@renderer/ui/organisms/data-table/recent-sales/RecentSalesTable"
import classes from "./index.module.css"

const DashBoard = () => {
    const theme = useMantineTheme();
    const [selectedStoreindex, setSelectedStoreindex] = useState<number | null>(null);
    const [selectedStore, setSelectedStore] = useState<any>({})
  
    const { TotalProducts, TotalStock, LowStocks, OutOfStocks, loading, storeName, handleSelectStoreSummary } = useSummary();
    const navigate = useNavigate();

    const handleSelectStore = (store: any) => {
        console.log(store)
        setSelectedStore(store)
    }
    const handlePOSNavigate = () => {
        if (!selectedStore) return alert("Select a store to continue")
        if (storeName === "General Summary") return alert("Select a store to continue.")
        navigate("/pos", {
            state: JSON.stringify(selectedStore)
        })
        setSelectedStore({})
    }


    const miniStoreCards = ProductStore.stores.map((data, index) => (
        <UnstyledButton
            key={index}
            p="md"
            mb="lg"
            w="200px"
            className={`${classes.card} ${selectedStoreindex === data.id  ? classes.selectedCard : "white"}`}
            onClick={() => {
                setSelectedStoreindex(data.id);
                handleSelectStoreSummary(data.id, data.name);
                handleSelectStore(data)
            }}
        >
            <Text c="black" fw={500}>
                {data.name}
            </Text>
        </UnstyledButton>
    ));

    return (
        <AppPageWrapper title={"Dashboard"} right={<UserButton />}>
            {loading && <LoadingOverlay visible />}
            <ScrollArea style={{ borderBottom: `1px solid ${theme.colors.gray[3]}` }} mb={`sm`}>
                <Text fw={600} mb={`md`} c={`dimmed`}>Total Store(s): <span style={{ color: "green" }}>{ProductStore.stores ? ProductStore.stores.length : 0}</span></Text>
                <Group w={`max-content`}>
                    {ProductStore.stores.length > 0 ? miniStoreCards : (
                        <Text>No stores availale</Text>
                    )}
                </Group>
            </ScrollArea>
            <Box px={`md`}>
                <Text fw={600} mb={`md`}>{storeName}</Text>
                <Grid>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={TotalProducts}
                            label="Total Products"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={TotalStock}
                            label="Available Stock"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={LowStocks}
                            label="Low Products"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={OutOfStocks}
                            label="Out of Stock"
                        // Icon={MdOutlineStoreMallDirectory}+
                        />
                    </Grid.Col>
                </Grid>

                <SimpleGrid cols={2} mt={`md`}>
                    <Paper h={`50vh`} p={`sm`}>
                        <Group justify="space-between">
                            <Text size="lg" c={`dimmed`}>Sales</Text>
                            <Button size="md" color={defaultColors.darkBlue} onClick={handlePOSNavigate}>
                                POS
                            </Button>
                        </Group>
                        <Text c={`dimmed`} size="sm" mt={`lg`}>Recent Sales</Text>
                        <RecentSalesTable onselect={function (data: any): void {
                            throw new Error("Function not implemented.")
                        }} />
                    </Paper>
                    <Paper h={`50vh`} p={`sm`}>
                        <Text size="lg" c={`dimmed`}>Product By Category</Text>
                        <RingProgress
                            thickness={29}
                            size={300}
                            // label={
                            //     <Text size="xs" ta="center">
                            //         Application data usage
                            //     </Text>
                            // }
                            sections={[
                                { value: 40, color: 'cyan' },
                                { value: 15, color: 'orange' },
                                { value: 15, color: 'grape' },
                            ]}
                        />
                    </Paper>
                </SimpleGrid>
            </Box>
        </AppPageWrapper>
    )
}

export default DashBoard