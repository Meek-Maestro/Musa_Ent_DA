import { Box, Button, Center, Input, SimpleGrid, Stack } from '@mantine/core';

import { useCategory } from '../../../../hooks/by-modules/useCategory';

export default function AddCategories() {
    const { category_form, saveCategory, submiting } = useCategory()
    return (
        <form onSubmit={category_form.onSubmit(async () => {
            if (await saveCategory()) {
                category_form.reset()
            }
        })}>
            <Box>
                <SimpleGrid cols={1}>
                    <Stack gap={0}>
                        <label >Category Name</label>
                        <Input {...category_form.getInputProps("name")} styles={{
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
