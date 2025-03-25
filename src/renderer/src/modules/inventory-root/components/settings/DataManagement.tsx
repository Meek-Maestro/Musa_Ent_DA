import { ActionIcon, Box, Button, Divider, Group, Input, Modal, Paper, ScrollArea, Select, Stack, Text, TextInput } from "@mantine/core";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MdBackup, MdDelete, MdRestore } from "react-icons/md";
import { backupSummary } from "@renderer/store/admin/backups";

export default observer(function DataManagement() {
    const [backupSummaryd, setBackupSummaryd] = useState<any[]>([])
    const [opened, setOpened] = useState<boolean>(false)
    useEffect(() => {
        setBackupSummaryd(backupSummary.summary || [])
    }, [backupSummary.summary])
    return (
        <Box mt={`xl`} >
            <Paper shadow="sm">
                <Box p={`sm`}>
                    <Text size="lg" fw={600}>Back up & Restore</Text>
                </Box>
                <Divider mb={`md`} />
                <Group p={`md`} justify="center">
                    <Button leftSection={<MdBackup size={30} />} onClick={() => setOpened(!opened)}>
                        Back up
                    </Button>
                    <Button leftSection={<MdRestore size={30} />}>
                        Restore
                    </Button>
                </Group>
                <Divider />
                <ScrollArea h={`70vh`}>
                    <Stack p={`md`}>
                        {backupSummaryd.map((data, index) => (
                            <Paper p={`md`} withBorder key={index}>
                                <Group justify="space-between" align="center">
                                    <Group>
                                        <Text><span style={{ fontWeight: 600 }}>Backup Name:</span> {data.file_name}</Text>
                                        <Divider orientation="vertical" />
                                        <Text> <span style={{ fontWeight: 600 }}>created At:</span> {data.created_at.slice(0, 10)}</Text>
                                    </Group>
                                    <ActionIcon c={`red`} variant="subtle">
                                        <MdDelete color="red" size={40} />
                                    </ActionIcon>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </ScrollArea>
            </Paper>
            <Modal opened={opened} centered onClose={() => setOpened(!opened)}>
                <Stack>
                    <Text size="lg" fw={600}>Create Backup</Text>
                    <Select label="Select Period" data={["Today", "This Week", "This Month"]} styles={{input:{
                        height:"50px"
                    }}} />
                    <TextInput label="Start Date" type="date" styles={{input:{
                        height:"50px"
                    }}} />
                    <TextInput label="End" type="date" styles={{input:{
                        height:"50px"
                    }}} />
                    <Button bg={`green`}>Create Backup</Button>
                </Stack>
            </Modal>
        </Box>
    )
})