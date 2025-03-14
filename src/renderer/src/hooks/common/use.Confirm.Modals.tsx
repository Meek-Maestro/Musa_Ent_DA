import { openConfirmModal } from "@mantine/modals";
import { Center, Stack, Text } from "@mantine/core"
import { MdWarning } from "react-icons/md";

export function useConfirm() {
  function confirm(action: () => void, title: string, description: string) {
    openConfirmModal({
      title: title,
      children: <Text size="sm">{description}</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      centered: true,
      padding: "lg",
      onCancel: () => console.log('Cancel'),
      onConfirm: () => action(),
    });
  }
  function confirmDelete(action: () => void, p0: string, p1: string) {
    openConfirmModal({
      title: 'Please confirm deletion',
      centered: true,
      children: (
        <Stack>
          <Center>
            <MdWarning color="red" size={100} />
          </Center>
          <Text ta="center" fw={'bold'}>
            {p0 ?? "Important!!!"}
          </Text>
          <Text size="sm" ta={'center'}>
            {p1 ?? " Are you sure you want to delete this resource? This action cannot be undone."}
          </Text>
        </Stack>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => action(),
    });
  }

  return { confirm, confirmDelete };
}
