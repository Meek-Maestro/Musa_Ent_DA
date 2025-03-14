import { Box, Button, Group, Title } from "@mantine/core";
import { observer } from "mobx-react";
import { useCategory } from "../../../../hooks/by-modules/useCategory";
import CategoryDataTable from "../../../../ui/organisms/data-table/categories-table/CategoriesTable"
import { defaultColors } from "../../../../ui/constants/constants";



export default observer(function Inventory() {
    const { startAddCategoryOperation } = useCategory()
    return (
        <Box p={`lg`} mt={`xl`} bg={`white`} h={`100vh`}>

            <Group justify="space-between" mb={`md`} mt={`md`}>
                <Title order={2}>Inventory Settings</Title>
                <Button h={40} w={200} color={defaultColors.darkBlue} onClick={startAddCategoryOperation}>
                    Add Category
                </Button>
            </Group>
            <CategoryDataTable />
        </Box>
    )
})