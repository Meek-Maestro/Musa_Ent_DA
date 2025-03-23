import { ActionIcon, Group, Paper, Radio, ScrollArea, Stack, Text, Title, Menu, Box } from "@mantine/core";
import { observer } from "mobx-react";
import classes from "./index.module.css";
import { useEffect, useState } from "react";
import { ProductStore } from "../../../../store/admin/stores";
import { IoOptionsSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useStore } from "../../../../hooks/by-modules/useStore";
import { useConfirm } from "../../../../hooks/common/use.Confirm.Modals";

interface cards {
  store_name: string;
  total_products: number;
  stock_level: string;
}

interface props {
  onselect: (data: any) => void;
}

const StatsCard = observer(({ onselect }: props) => {
  const { deleteStore, startEditStoreOperation } = useStore();
  const { confirmDelete } = useConfirm();

  const [storeReport, setStoreReport] = useState<cards[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  useEffect(() => {
    setStoreReport(ProductStore.storeReport || []);
  }, [ProductStore.storeReport]);

  const handleEditStore = (data: cards) => {
    const store = ProductStore.stores.find((s: any) => s.name === data.store_name);
    if (store) {
      startEditStoreOperation(store);
    }
  };

  const handleDeleteStore = (data: cards) => {
    const store = ProductStore.stores.find((s: any) => s.name === data.store_name);
    console.log(store);
    if (store) {
      confirmDelete(async () => await deleteStore(store.id), "Confirm Delete", "Are you sure you want to delete this store?");
    }
  };

  const handleSelectStore = (storeName: string) => {
    setSelectedStore(storeName);
    onselect(storeName);
  };

  const StoreCards = storeReport.map((data, index) => (
    <Paper
      shadow="md"
      p={`lg`}
      key={index}
      className={`${classes.card} ${selectedStore === data.store_name  ? classes.selectedCard : ""}`}
      withBorder
      w={`40vh`}
      onClick={() => handleSelectStore(data.store_name)}
    >
      <Group justify="end">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IoOptionsSharp size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleEditStore(data)}>
              <MdEdit size={14} color="green" /> Edit
            </Menu.Item>
            <Menu.Item onClick={() => handleDeleteStore(data)}>
              <MdDelete size={14} color="red" /> Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Stack>
        <Title order={2}>{data.store_name}</Title>
        <Text>Total Stock Available</Text>
        <Group>
          <Title order={2}>{data.total_products}</Title>
          <Text size="sm">Products</Text>
        </Group>
        <Group justify="space-between">
          <Text>Stock Level</Text>
          <Group>
            <Text>{data.stock_level}</Text>
            <Radio
              defaultChecked
              color={
                data.stock_level == "High"
                  ? "green"
                  : data.stock_level == "Medium"
                    ? "yellow"
                    : data.stock_level == "Low"
                      ? "red"
                      : "purple"
              }
            />
          </Group>
        </Group>
      </Stack>
    </Paper>
  ));

  return (
    <ScrollArea w="100%" h="auto" offsetScrollbars style={{ boxShadow: "inherit" }}>
      <Group w="max-content" h={`max-content`} >
        {storeReport.length > 0 ? (
          StoreCards
        ) : (
          <center>
            <Text ta={`center`} c={`dimmed`}>Store List is empty.</Text>
          </center>
        )}
      </Group>
    </ScrollArea>
  );
});

export default StatsCard;