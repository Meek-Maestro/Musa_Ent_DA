import { Box, Button, Group, Title } from "@mantine/core";
import UsersTable from "../../../../ui/organisms/data-table/users-table/UsersTable";
import { observer } from "mobx-react";
import { defaultColors } from "../../../../ui/constants/constants";
import StatsCard from "../../../../ui/common/cards/store/StoreStatsCard";
import  { StoreOverview } from "../../../../ui/organisms/data-table/store-overview-table/StoreDataTable";
import { useStore } from "../../../../hooks/by-modules/useStore";


export default observer(function StoreManagement() {
    const {startAddOperation} = useStore()
    return (
        <Box p={`lg`} mt={`xl`} bg={`white`} h={`100vh`}>
           
            <Group justify="space-between" mb={`md`} mt={`md`}>
                <Title order={2}>Store Management</Title>
                
                <Button h={40} w={200} color={defaultColors.darkBlue} onClick={startAddOperation}>
                    Add Store
                </Button>

                <StatsCard/>
            </Group>
            
            {/* <StoreOverview/> */}
        </Box>
    )
})