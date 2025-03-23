import { Box, Button, Group, Input, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { observer } from "mobx-react";
import { useUsers } from "../../../../hooks/by-modules/use.Users";

const AddUser = observer(() => {
    const { user_form, saveUser, submiting } = useUsers()
    return (
        <form onSubmit={user_form.onSubmit(async () => {
            if (await saveUser()) {
                user_form.reset()
            }
        })}>
            <Box>
                    <Group grow>
                        <TextInput label="Username" styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...user_form.getInputProps("username")} />
                        <TextInput label="Password" styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...user_form.getInputProps("password")} />
                        <Select label="Role" styles={{
                            input: {
                                height: "40px"
                            }
                        }} data={["ADMIN", "SALESPERSON", "CASHIER"]} variant="filled" {...user_form.getInputProps("role")} />
                    </Group>
                
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Add</Button>
            </Box>
        </form>
    )

})

export default AddUser