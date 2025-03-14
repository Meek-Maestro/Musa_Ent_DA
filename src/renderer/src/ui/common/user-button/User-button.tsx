import { UnstyledButton, Group, Avatar, Text, Badge, ActionIcon, Indicator, Menu, Progress } from '@mantine/core';
import classes from './UserButton.module.css';
import { observer } from 'mobx-react';
import { IoNotificationsOutline } from "react-icons/io5";
import { authManager } from '../../../store/auth';
import { MdLogout } from "react-icons/md";
import { categoriesStore } from '../../../store/admin/categories';
import { customerStore } from '../../../store/admin/customers';
import { products } from '../../../store/admin/products';
import { ProductStore } from '../../../store/admin/stores';
import { SupplierStore } from '../../../store/admin/suppliers';
import { userStore } from '../../../store/admin/users';
import { showNotification } from '@mantine/notifications';
import { purchaseStore } from '../../../store/admin/purchase';

export const UserButton = observer(function UserButton() {
  const { username, role } = authManager.profile;


  const handleLogout = () => {
    authManager.logout();
  };

  const handleReloadResources = () => {
    try {
      showNotification({
        message: "Reloading Resources",
        position: "top-center",
        style: {
          backgroundColor: "blue",
          color: "white"
        }
      })
      userStore.loadusers()
      customerStore.loadCustomers()
      SupplierStore.loadSuppliers()
      ProductStore.loadStores()
      ProductStore.loadStockReports()
      products.loadProducts()
      categoriesStore.loadCategories()
      purchaseStore.loadPurchases()
    } catch (error) {
      showNotification({
        message: "Something went wrong while Loading Resource",
        position: "top-center",
        style: {
          backgroundColor: "Red",
          color: "white"
        }
      })
    } finally {

    }

  }

  return (
    <Menu shadow="md" width={200}>

      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={""} radius="xl" size={`lg`} />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {username}
              </Text>
              <Badge size="sm" fw={`bold`}>{role}</Badge>
            </div>
            <ActionIcon size={`input-xl`} variant='subtle' radius={`md`} color='white'>
              <Indicator variant='filled'>
                <IoNotificationsOutline size={35} color='black' />
              </Indicator>
            </ActionIcon>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<MdLogout size={14} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
        <Menu.Item leftSection={<MdLogout size={14} />} onClick={handleReloadResources}>
          Reload all Resource
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});