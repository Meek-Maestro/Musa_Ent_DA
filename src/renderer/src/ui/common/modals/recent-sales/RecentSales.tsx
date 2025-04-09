import { Button, Group, LoadingOverlay, Stack } from "@mantine/core";
import { useRecentTransactions } from "@renderer/hooks/by-modules/use.RecentTransactions";
import RecentSalesTable from "@renderer/ui/organisms/data-table/recent-salesPOS/RecentSalesTable";
import { observer } from "mobx-react";
import { MdRefresh } from "react-icons/md";

export default observer(function RecentSalesModal() {
    const {refresh, submiting} = useRecentTransactions()

    return (
        <>
            {submiting && <LoadingOverlay visible></LoadingOverlay>}
            <Stack mx={`xl`}>
                <Group justify="end">
                    <Button leftSection={<MdRefresh size={30} />} onClick={refresh}>
                        Refresh
                    </Button>
                </Group>
                <RecentSalesTable onselect={function (data: any): void {
                    throw new Error("Function not implemented.");
                }} />
            </Stack>
        </>
    )
})