import { Box, Button, Center, Input, ModalProps, SimpleGrid, Stack } from '@mantine/core';
import { useStore } from '../../../../hooks/by-modules/useStore';
import { useEffect } from 'react';

interface InnerProps extends ModalProps {
    innerProps: {
        id:string
        name: string
        location: string
    }
}

export default function EditStoreModal({ innerProps }: InnerProps) {
    const { store_form, updateStore, submiting } = useStore()
    useEffect(() => {
        store_form.setValues(innerProps)
    }, [innerProps])
    return (
        <form onSubmit={store_form.onSubmit(async () => {
            if (await updateStore(innerProps.id)) {
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
                    <Button loading={submiting} size='md' type='submit' fullWidth radius={`md`}>Update</Button>
                </Center>
            </Box>
        </form>
    );
}
