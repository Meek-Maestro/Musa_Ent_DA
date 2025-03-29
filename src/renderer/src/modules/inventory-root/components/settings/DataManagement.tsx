import { ActionIcon, Box, Button, Center, Divider, FileButton, Group, Modal, Paper, ScrollArea, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MdBackup, MdCancel, MdDelete, MdEdit, MdRestore } from "react-icons/md";
import { backupSummary } from "@renderer/store/admin/backups";
import { useConfirm } from "@renderer/hooks/common/use.Confirm.Modals";
import { useBackUp } from "@renderer/hooks/security/UseBackUp";
import { FaFile, FaFolder } from "react-icons/fa6";

export default observer(function DataManagement() {
    const { backup_form, backup, loading, backupDir, selectBackupDirectory, restore, deletBackupRecord } = useBackUp()
    const theme = useMantineTheme()
    const { confirmDelete } = useConfirm()
    const [backupSummaryd, setBackupSummaryd] = useState<any[]>([])
    const [opened, setOpened] = useState<boolean>(false)
    const [restoreModal, setRestoreModal] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null);
    const [selectedBackup, setSelectedBackup] = useState<any>(null)
    useEffect(() => {
        setBackupSummaryd(backupSummary.summary || [])
    }, [backupSummary.summary])

    const handleDelete = (id: string) => {
        console.log(id)
        if (id) {
            confirmDelete(() => deletBackupRecord(id), "Confirm Delete", "Are you sure you want to delete this backup?")
        }
    }
    const options = [
        {
            label: "Today",
            value: "today"
        },
        {
            label: "This Week",
            value: "this_week"
        },
        {
            label: "This Month",
            value: "this_month"
        },

    ]

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
                    <Button leftSection={<MdRestore size={30} />} onClick={() => setRestoreModal(!restoreModal)}>
                        Restore
                    </Button>
                </Group>
                <Divider />
                <Group my={`sm`} justify="center" align="center">
                    <FaFolder size={30} color={theme.colors.gray[6]} />
                    <Text><strong style={{}}>Directory:</strong> {backupDir}</Text>
                    <MdEdit color="grey" size={20}
                        onClick={selectBackupDirectory}
                        style={{ cursor: "pointer" }} />
                </Group>
                <ScrollArea h={`70vh`} bg={theme.colors.green[0]}>
                    <Stack p={`md`}>
                        {backupSummaryd.map((data, index) => (
                            <Paper p={`md`} shadow="none" withBorder key={index}>
                                <Group justify="space-between" align="center">
                                    <Group>
                                        <Text><span style={{ fontWeight: 600 }}>Backup Name:</span> {data.file_name}</Text>
                                        <Divider orientation="vertical" />
                                        <Text> <span style={{ fontWeight: 600 }}>created At:</span> {data.created_at.slice(0, 10)}</Text>
                                    </Group>
                                    <ActionIcon onClick={() => handleDelete(data.id)} c={`red`} variant="subtle">
                                        <MdDelete color="red" size={40} />
                                    </ActionIcon>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </ScrollArea>
            </Paper>
            <Modal opened={opened} centered onClose={() => setOpened(!opened)}>
                <form onSubmit={backup_form.onSubmit(async () => {
                    const formData = new FormData()
                    formData.append("period", backup_form.values.period.toString())
                    formData.append("start_date", backup_form.values.start_date)
                    formData.append("end_date", backup_form.values.end_date)
                    await backup(formData)
                })}>
                    <Stack>
                        <Text size="lg" fw={600}>Create Backup</Text>
                        {/* <Group my={`sm`} justify="space-between">
                            <Text>Directory: C://users/user/Documents</Text>
                            <MdEdit color="grey" size={20}/>
                        </Group> */}
                        <Select {...backup_form.getInputProps("period")} label="Select Period" data={options.map((data) => ({
                            label: data.label,
                            value: data.value
                        }))} styles={{
                            input: {
                                height: "50px"
                            }
                        }} />
                        <TextInput {...backup_form.getInputProps("start_date")} label="Start Date" type="date" styles={{
                            input: {
                                height: "50px"
                            }
                        }} />
                        <TextInput {...backup_form.getInputProps("end_date")} label="End Date" type="date" styles={{
                            input: {
                                height: "50px"
                            }
                        }} />
                        <Button h={`50px`} bg={`green`} type="submit" loading={loading}>Create Backup</Button>
                    </Stack>
                </form>
            </Modal>
            <Modal opened={restoreModal} centered onClose={() => setRestoreModal(!restoreModal)}>
                <form onSubmit={backup_form.onSubmit(async () => {
                    await restore(file)
                })}>
                    <Stack>
                        <UnstyledButton bg={theme.colors.blue[10]} c={theme.colors.blue[100]} variant="subtle" h={`70%`}>
                            <Center c={`dimmed`}>
                                <Stack align="center">
                                    <MdRestore size={100} />
                                    <Group justify="center">
                                        <FileButton onChange={(files) => setFile(files[0] || null)} accept="application/json" multiple>
                                            {(props) => <Button {...props} variant="subtle" fw={500}>Select Backup file</Button>}
                                        </FileButton>
                                    </Group>

                                    {file && (
                                        <Text size="sm" mt="sm">
                                            Selected file:
                                        </Text>
                                    )}
                                    {file && (
                                        <Stack>

                                            <Group justify="center" align="center">
                                                <li>{file.name}</li>
                                                <ActionIcon onClick={() => setFile(null)} c={`dimmed`} variant="subtle">
                                                    <MdCancel />
                                                </ActionIcon>
                                            </Group>

                                            <Group mt={`xl`}>
                                                <Button type="submit" loading={loading} w={`200px`} m={0}>Restore</Button>
                                            </Group>
                                        </Stack>
                                    )}
                                </Stack>
                            </Center>
                        </UnstyledButton>
                    </Stack>
                </form>
            </Modal>
        </Box>
    )
})