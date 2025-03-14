import { ActionIcon, Group, Select, TextInput } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../../ui/common/user-button/User-button";
import DamagedTable from "../../../../../ui/organisms/data-table/damaged-products/DamagedTable";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default observer(function DamagedProducts() {
    const [select, setSelected] = useState()
    const [filteredText, setFilterText] = useState("")
    const navigate = useNavigate()
    return (
        <AppPageWrapper title="Damaged Products" right={<UserButton />}>
            <ActionIcon size={`xl`} mb={`md`} onClick={() => navigate("/expenses")}>
                <MdArrowBack size={30} />
            </ActionIcon>
            <Group bg={`white`} p={`lg`}>
                <TextInput label="Order ID" variant="filled" />
                <Select label="Supplier" variant="filled" />
            </Group>
            <DamagedTable onselect={setSelected} filterText={filteredText} />
        </AppPageWrapper>
    )
})