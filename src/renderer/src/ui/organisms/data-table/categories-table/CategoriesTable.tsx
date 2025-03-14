import { observer } from "mobx-react";
import { Table, ScrollArea, Menu, ActionIcon } from "@mantine/core";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { categoriesStore } from "../../../../store/admin/categories";
import { IoOptionsOutline } from "react-icons/io5";
import { useCategory } from "@renderer/hooks/by-modules/useCategory";
import { useConfirm } from "@renderer/hooks/common/use.Confirm.Modals";

export default observer(function CategoryDataTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const { deleteCategory, startEditCategoryOperation } = useCategory()
  const { confirmDelete } = useConfirm()

  const handleDeleteCategory = (id: string) => {
    if (id) {
      confirmDelete(() => deleteCategory(id), "Confirm Delete", "Are you sure you want to delete this category?")
    }
  }
  const handleEditCategory = (data: any) => {
    if (data) {
      startEditCategoryOperation(data)
    }
  }

  useEffect(() => {
    setCategories(categoriesStore.categories || []);
  }, [categoriesStore.categories]);

  return (
    <ScrollArea>
      <Table striped highlightOnHover mt="lg" className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={classes.equalWidth}>ID</Table.Th>
            <Table.Th className={classes.equalWidth}>Category Name</Table.Th>
            <Table.Th className={`${classes.equalWidth} ${classes.menuColumn}`}>Options</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {categories.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td className={classes.equalWidth}>{item.id}</Table.Td>
              <Table.Td className={classes.equalWidth}>{item.name}</Table.Td>
              <Table.Td className={`${classes.equalWidth} ${classes.menuColumn}`}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle">
                      <IoOptionsOutline size={30} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item c={`blue`} onClick={()=> handleEditCategory(item)}>Edit</Menu.Item>
                    <Menu.Item c={`red`} onClick={() => handleDeleteCategory(item.id)}>Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
});