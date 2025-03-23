import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { ActionIcon, Box, Button, Divider, Group, Input, Modal, Paper, Title, Text } from "@mantine/core";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import StatsCard from "../../../../ui/common/cards/store/StoreStatsCard";
import { defaultColors } from "../../../../ui/constants/constants";
import { MdRefresh, MdSearch } from "react-icons/md";
import classes from "./index.module.css"
import { FaFilter } from "react-icons/fa6";
import { useStore } from "../../../../hooks/by-modules/useStore";
import StoreProducts from "../../../../ui/organisms/data-table/store-table/StoreProducts";
import { useState } from "react";
import { ProductStore } from "../../../../store/admin/stores";
import { products } from "../../../../store/admin/products";
import TransferProducts from "@renderer/ui/common/modals/transfer-products/TransferProducts";

const Stores = observer(() => {
    const [filterText, setFilterText] = useState("");
    const { startAddOperation } = useStore()
    const [selectedStore, setSelectedStore] = useState(ProductStore.stores[0]?.name)
    const [selectedProducts, setSelectedProducts] = useState<any[]>([])
    const [openModal, setOpenModal] = useState(false)
    console.log(selectedProducts)

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };
    const handleOpenTransferModal = () => {
        if (selectedProducts.length === 0) return alert("Select a product to transfer")
        setOpenModal(!openModal)
    }
    const handleUncheckProduct = (index: number) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index))
    }
    return (
        <AppPageWrapper title="Stores" right={<UserButton />}>
            <Box>
                <ActionIcon variant="subtle" onClick={() => {
                    ProductStore.loadStores()
                    ProductStore.loadStockReports()
                    products.loadProducts()
                }}>
                    <MdRefresh size={30} />
                </ActionIcon>
                <StatsCard onselect={setSelectedStore} />
                <Paper h={`100vh`} p={`md`} mt={`lg`}>
                    <Title order={2}>Products</Title>
                    <Group my={`lg`} justify="space-between">
                        <Input className={classes.input}
                            styles={{
                            }} size="lg" leftSection={<MdSearch size={30} />}
                            rightSection={<FaFilter size={25} />}
                            value={filterText}
                            onChange={handleFilterChange}
                        />
                        <Button.Group style={{ gap: 8 }}>
                            <Button bg={defaultColors.lightGreen} onClick={startAddOperation}>New Store</Button>
                            <Button onClick={handleOpenTransferModal}>Transfer</Button>
                        </Button.Group>
                    </Group>
                    <Divider />
                    <StoreProducts storeName={selectedStore} filterText={filterText} select={setSelectedProducts} />
                </Paper>
            </Box>
            <Modal centered title={<Text fw={700} size="xl">
                Transfer {selectedProducts.length > 1 ? `${selectedProducts.length} Products` : `${selectedProducts.length} Product`}
            </Text>} size={`60%`} opened={openModal} onClose={() => setOpenModal(false)}>
                <TransferProducts
                    selectedProducts={selectedProducts}
                    deleteProduct={handleUncheckProduct}
                    closeModal={()=> setOpenModal(false)}
                />
            </Modal>
        </AppPageWrapper>
    )
})

export default Stores