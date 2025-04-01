import { useEffect, useState } from "react";
import { Modal, TextInput, Button, Text, Stack, Group } from "@mantine/core";
import { settingsRespository } from "@renderer/store/dexi/user.settings";
import { BiShocked } from "react-icons/bi";

export default function BaseURLModal() {
    const [opened, setOpened] = useState(false);
    const [baseURL, setBaseURLInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function checkBaseURL() {
            const storedBaseURL = await settingsRespository.getBaseURL();
            if (!storedBaseURL) {
                setOpened(true);
            }
        }
        checkBaseURL();
    }, []);

    const validateBaseURL = (url: string): boolean => {
        // Regex to validate URLs starting with http:// or https://
        const urlRegex = /^(https?:\/\/)[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(:\d+)?(\/.*)?$/;
        return urlRegex.test(url);
    };

    const handleSave = async () => {
        if (!validateBaseURL(baseURL)) {
            setError("Please enter a valid URL starting with http:// or https://");
            return;
        }
        try {
            await settingsRespository.setBaseURL(baseURL);
        } catch (error) {
            console.log(error)
        } finally {
            console.log(settingsRespository.getBaseURL())
            setOpened(false);
            window.location.reload();
        }
    };

    return (
        <Modal opened={opened} onClose={() => setOpened(false)} centered title="Set Base URL">
            <Stack>
                <Group mx={23} justify="center" gap={0} style={{ flexDirection: 'column' }}>
                    <BiShocked size={40} />
                    <Text>Oops it seems like your application</Text>
                    <Text ta={`center`}> doesn't have a base url</Text>
                </Group>

                <TextInput
                    label="Base URL"
                    placeholder="Enter the API base URL"
                    value={baseURL}
                    onChange={(e) => {
                        setBaseURLInput(e.currentTarget.value);
                        setError("");
                    }}
                    error={error}
                />
                <Button fullWidth mt="md" onClick={handleSave}>
                    Save
                </Button>
            </Stack>
        </Modal>
    );
}