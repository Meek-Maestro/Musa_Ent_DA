import { Button, Divider, Group, LoadingOverlay, Stack, Text, TextInput } from "@mantine/core";
import { useRecentTransactions } from "@renderer/hooks/by-modules/use.RecentTransactions";
import RecentSalesTable from "@renderer/ui/organisms/data-table/recent-salesPOS/RecentSalesTable";
import { observer } from "mobx-react";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";

export default observer(function RecentSalesModal() {
    const { refresh, submiting } = useRecentTransactions()
    const defaultDate = new Date().toISOString().slice(0, 10)
    const [date, setDate] = useState<string>(defaultDate)
    const [searchQuery, setSearchQuery] = useState<string>("")

    return (
        <>
            {submiting && <LoadingOverlay visible></LoadingOverlay>}
            <Stack mx={`xl`}>
                <Group justify="end">
                    <Text c={`dimmed`}>Filter By Date: </Text><TextInput placeholder="Filter by date" value={date} type="date" onChange={(value) => setDate(value.target.value)} />
                    <TextInput placeholder="Search..." onChange={(value)=> setSearchQuery(value.target.value)} />
                    <Button leftSection={<MdRefresh size={30} />} onClick={refresh}>
                        Refresh
                    </Button>
                </Group>
                <Divider/>
                <RecentSalesTable filterByDate={date} filterBytext={searchQuery} />
            </Stack>
        </>
    )
})