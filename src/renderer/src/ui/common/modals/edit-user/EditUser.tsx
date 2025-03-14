import { Box, Button, Input, ModalProps, Select, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import { useUsers } from "../../../../hooks/by-modules/use.Users";
import { useEffect } from "react";
import { modals } from "@mantine/modals";

interface EditUserProps extends ModalProps {
    innerProps: {
        id: string,
        "username": string,
        "email": string
        "role": string
        "password": string
    };
}


const Edituser = observer(({ innerProps }: EditUserProps) => {

    const { user_form, updateUser, submiting } = useUsers()
    useEffect(() => {
        user_form.setValues(innerProps)
    }, [innerProps])
    return (
        <form onSubmit={user_form.onSubmit(async () => {
            if (await updateUser(innerProps.id)) {
                user_form.reset()
                modals.closeAll()
            }
        })}>
            <Box>
                <SimpleGrid cols={2}>
                    <Stack>
                        <label >Username</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" {...user_form.getInputProps("username")} />
                        <label >Email</label>
                        <Input styles={{
                            input: {
                                height: "40px"
                            }
                        }} variant="filled" type="email" {...user_form.getInputProps("email")} />

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
                        }} variant="filled" type="password" {...user_form.getInputProps("password")} />
                    </Stack>

                </SimpleGrid>
                <Button loading={submiting} type="submit" fullWidth h={`40`} mt={`md`}>Update</Button>
            </Box>
        </form>
    )

})

export default Edituser