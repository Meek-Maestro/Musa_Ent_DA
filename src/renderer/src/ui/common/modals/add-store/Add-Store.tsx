import { Box, Button, Center, Input, SimpleGrid, Stack } from '@mantine/core';
import { useStore } from '../../../../hooks/by-modules/useStore';

export default function AddStoreModal() {
    const { store_form, saveStore, submiting } = useStore()
    return (
        <form onSubmit={store_form.onSubmit(async () => {
            if (await saveStore()) {
                store_form.reset()
            }
        })}>
            <Box>
                <SimpleGrid cols={1}>
                    <Stack gap={0}>
                        <label >Store Name</label>
                        <Input {...store_form.getInputProps("name")} styles={{
                            input: {
                                height: "42px"
                            }
                        }} mb={`md`} variant='filled' />
                        <label >Location</label>
                        <Input {...store_form.getInputProps("location")} styles={{
                            input: {
                                height: "42px"
                            }
                        }} mb={`md`} variant='filled' />
                    </Stack>

                </SimpleGrid>
                <Center mt={`md`} mx={`lg`}>
                    <Button loading={submiting} size='md' type='submit' fullWidth radius={`md`}>Add</Button>
                </Center>
            </Box>
        </form>
    );
}
