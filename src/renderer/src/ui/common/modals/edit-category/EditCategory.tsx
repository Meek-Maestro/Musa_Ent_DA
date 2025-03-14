import { Box, Button, Center, Input, ModalProps, SimpleGrid, Stack } from '@mantine/core';

import { useCategory } from '../../../../hooks/by-modules/useCategory';
import { useEffect } from 'react';
import { modals } from '@mantine/modals';

interface InnerProps extends ModalProps {
    innerProps: {
        id: string
        name: string
    }
}

export default function EditCategory({ innerProps }: InnerProps) {
    const { category_form, updateCategory, submiting } = useCategory()
    useEffect(() => {
        category_form.setValues(innerProps)
    }, [innerProps])
    return (
        <form onSubmit={category_form.onSubmit(async () => {
            if (await updateCategory(innerProps?.id)) {
                category_form.reset()
                modals.closeAll()
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
                    <Button loading={submiting} size='md' type='submit' fullWidth radius={`md`}>Update</Button>
                </Center>
            </Box>
        </form>
    );
}
