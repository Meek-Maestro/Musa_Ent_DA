import { Box, Button, Input, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
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
                <SimpleGrid cols={1}>
                    <Stack>
                        <label >Username</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...user_form.getInputProps("username")} />
                    </Stack>
                    <Stack>
                    <label >Role</label>
                        <Select styles={{
                            input: {
                                height: "40px"
                            }
                        }} data={["ADMIN", "SALESPERSON", "CASHIER"]} variant="filled" {...user_form.getInputProps("role")} />

                        <label >Password</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...user_form.getInputProps("password")}/>
                    </Stack>
                </SimpleGrid>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Add</Button>
            </Box>
        </form>
    )

})

export default AddUser