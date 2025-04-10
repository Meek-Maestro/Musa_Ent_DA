import { ActionIcon, Badge, Box, Button, Divider, Group, Input, Loader, LoadingOverlay, Progress, RingProgress, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import ProductsDatatable from "../../../../ui/organisms/data-table/products-table/ProductsDatatable";
import { defaultColors } from "../../../../ui/constants/constants";
import { useConfirm } from "../../../../hooks/common/use.Confirm.Modals";
import { MdRefresh, MdSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import classes from "./index.module.css";
import { useProducts } from "../../../../hooks/by-modules/use.Products";
import { useState } from "react";
import { products } from "@renderer/store/admin/products";

const Products = observer(() => {
  const { confirmDelete } = useConfirm();
  const { startAddOperation, deleteProduct, startEditOperation, submiting, ReloadProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [filterText, setFilterText] = useState<string>("");

  const handleConfirm = () => {
    if (selectedProduct) {
      confirmDelete(() => deleteProduct(selectedProduct?.id), "Confirm", "Are you sure you want to delete?");
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return (
    <AppPageWrapper title="Products" right={<UserButton />}>
      <Box>
        <Group>
          <ActionIcon title="Refresh Products table" variant="subtle" onClick={() => {
            ReloadProducts()
          }}>
            <MdRefresh size={30} />
          </ActionIcon>
          <Badge p={`sm`}>
            <Text size={`sm`}>{products.products.length} Products</Text>
          </Badge>
        </Group>
        {submiting && (
          <Group justify="center" pos={`fixed`} left={50} right={50} top={25} h={`100vh`}
            color="black" w={`100vw`} style={{ zIndex: 100, backgroundColor: "rgb(0, 0, 0, 0.1)" }}>
            <Stack justify="center" align="center">
              {<Loader />}
              <Text size="lg" ta={`center`} fw={`600`}>Refreshing...</Text>
            </Stack>
          </Group>
        )}

        <Box h={`100vh`} bg={`white`} style={{ borderRadius: "12px" }} mt={`sm`} p={`sm`}>
          <Group justify="space-between">
            <Group>
              <Input
                className={classes.input}
                styles={{}}
                size="lg"
                leftSection={<MdSearch size={30} />}
                rightSection={<FaFilter size={25} />}
                value={filterText}
                onChange={handleFilterChange}
              />
            </Group>
            <Button.Group style={{ gap: "20px" }}>
              <Button variant="filled" bg={defaultColors.lightGreen} radius={`md`} onClick={startAddOperation}>
                Add Product
              </Button>
              <Button disabled={Object.keys(selectedProduct).length === 0} variant="filled" bg={defaultColors.limeColor} radius={`md`} onClick={() => startEditOperation(selectedProduct)}>
                Edit Product
              </Button>
              <Button disabled={Object.keys(selectedProduct).length === 0} variant="filled" bg={defaultColors.darkRed} radius={`md`} onClick={handleConfirm}>
                Delete Product
              </Button>
              <Button variant="filled" bg={defaultColors.darkBlue} radius={`md`}>
                Print
              </Button>
            </Button.Group>
          </Group>
          <Divider mt={`md`} />
          <ProductsDatatable onselect={setSelectedProduct} filterText={filterText} />
        </Box>
      </Box>
    </AppPageWrapper>
  );
});

export default Products;