import { Box, Button, Group, Title } from "@mantine/core";
import UsersTable from "../../../../ui/organisms/data-table/users-table/UsersTable";
import { observer } from "mobx-react";
import { defaultColors } from "../../../../ui/constants/constants";
import { useUsers } from "../../../../hooks/by-modules/use.Users";
import { useState } from "react";
import { useConfirm } from "../../../../hooks/common/use.Confirm.Modals";

export default observer(function UserManagement() {
    const { startAddUserOperation, startEditUserOperation, deleteUser } = useUsers();
    const { confirmDelete } = useConfirm()
    const [selectedUser, setSelectedUser] = useState<any>({});
    const handleDeleteUser = () => {
        confirmDelete(async () => {await deleteUser(selectedUser.id)
            setSelectedUser({})
        }, "Confirm", `Are you sure you want to delete ${selectedUser.username}`)
    }
    return (
        <Box p={`lg`} mt={`xl`} bg={`white`} h={`100vh`}>
            <Group justify="space-between">
                <Title order={2}>User Management</Title>
                <Button.Group style={{ gap: 10 }}>
                    <Button
                        color={defaultColors.lightGreen}
                        variant="filled"
                        onClick={startAddUserOperation}
                    >
                        Add User
                    </Button>
                    <Button
                        color={defaultColors.limeColor}
                        variant="filled"
                        disabled={Object.keys(selectedUser).length === 0}
                        onClick={() => startEditUserOperation(selectedUser)}
                    >
                        Edit User
                    </Button>
                    <Button
                        color={defaultColors.darkRed}
                        variant="filled"
                        disabled={Object.keys(selectedUser).length === 0}
                        onClick={handleDeleteUser}>
                        Delete User
                    </Button>
                </Button.Group>
            </Group>

            <UsersTable onselect={setSelectedUser} />
        </Box>
    );
});
