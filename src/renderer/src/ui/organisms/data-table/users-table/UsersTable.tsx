import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, Center, Text, Divider } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { userStore } from "../../../../store/admin/users";

interface props{
  onselect:(data:any)=>void
}

export default observer(function UsersDataTable({onselect}:props) {
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any[]>([])

  useEffect(()=>{
    setUsers(userStore.users || [])
  }, [userStore.users])

  const handleSelectUser = (customer: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUser((prev) => [...prev, customer]);
        onselect(customer);
    } else {
      setSelectedUser((prev) =>
            prev.filter((item) => item.id !== customer.id)
        );
        onselect({});
    }
   
   
};
  return (
    <ScrollArea>
      <Center p={`md`}>
        <Text fw={600} size="lg">Available Users</Text>
      
      </Center>
        <Divider/>
      <Table
        striped
        highlightOnHover
        mt="lg"
        className={classes.table}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox />
            </Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
              <Checkbox onChange={(event) => handleSelectUser(item, event.currentTarget.checked)} />
              </Table.Td>
             <Table.Td>{item.id}</Table.Td>
             <Table.Td>{item.username}</Table.Td>
             <Table.Td>{item.role}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});
