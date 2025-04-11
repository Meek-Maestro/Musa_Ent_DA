import { useEffect, useState } from "react";
import { Modal, TextInput, Button, Text, Stack, Group, Loader, Center } from "@mantine/core";
import { settingsRespository } from "@renderer/store/dexi/user.settings";
import { BiShocked } from "react-icons/bi";
import { useSystemInitializer } from "@renderer/hooks/security/setup";

export default function BaseURLModal() {
    const { checkApiHealth, baseUrlForm, loading, state } = useSystemInitializer()
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        async function checkBaseURL() {
            const storedBaseURL = await settingsRespository.getBaseURL();
            if (!storedBaseURL) {
                setOpened(true);
            }
        }
        checkBaseURL();
    }, []);


    return (
        <Modal opened={opened} withCloseButton={false} onClose={() => setOpened(true)} centered title="Set Base URL">
            <Stack>
                {state.loading ? (
                    <>
                        <Center>
                            <Stack>
                                <Text fw={600} size="xl">{state.state}</Text>
                                <center>
                                    {state.savingUrl && <Loader />}
                                </center>
                            </Stack>
                        </Center>
                    </>
                ) : (
                    <>
                        <Group mx={23} justify="center" gap={0} style={{ flexDirection: 'column' }}>
                            <BiShocked size={40} />
                            <Text size="lg">Oops it seems like your application</Text>
                            <Text ta={`center`}> doesn't have a base url</Text>
                        </Group>
                        <form
                            onSubmit={baseUrlForm.onSubmit(async () => {
                                const response = await checkApiHealth()
                                if (response) {
                                    setOpened(false)
                                }
                            })}
                        >
                            <TextInput
                                label="Base URL"
                                placeholder="Enter the API base URL"
                                {...baseUrlForm.getInputProps("baseUrl")}
                            />
                            <Button fullWidth mt="md" type="submit" loading={loading}>
                                Save
                            </Button>
                        </form>
                    </>
                )}


            </Stack>
        </Modal>
    );
}