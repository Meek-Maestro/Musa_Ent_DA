import { UnstyledButton, Group, Avatar, Text, Badge, ActionIcon, Indicator, Menu, Progress } from '@mantine/core';
import classes from './UserButton.module.css';
import { observer } from 'mobx-react';
import { IoNotificationsOutline, IoReload, IoSettings } from "react-icons/io5";
import { authManager } from '../../../store/auth';
import { MdClose, MdLogout } from "react-icons/md";
import { categoriesStore } from '../../../store/admin/categories';
import { customerStore } from '../../../store/admin/customers';
import { products } from '../../../store/admin/products';
import { ProductStore } from '../../../store/admin/stores';
import { SupplierStore } from '../../../store/admin/suppliers';
import { userStore } from '../../../store/admin/users';
import { showNotification } from '@mantine/notifications';
import { purchaseStore } from '../../../store/admin/purchase';
import { useNavigate } from 'react-router-dom';
import { createElement } from 'react';
import { storeSummary } from '@renderer/store/summary';
import { recentSalesSummary } from '@renderer/store/recent_sales';
import { backupSummary } from '@renderer/store/admin/backups';
import { expenseStore } from '@renderer/store/admin/expenses';
import { TiTickOutline } from 'react-icons/ti';
import { environmentLoader } from '@renderer/store/environment/loader';

export const UserButton = observer(function UserButton() {
  const { username, role } = authManager.profile;
  const navigate = useNavigate()

  const handleLogout = () => {
    authManager.logout();
    navigate("/")
  };



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
        <Menu.Item leftSection={<IoReload size={14} />} onClick={environmentLoader.loadBusinessResources}>
          Reload all Resource
        </Menu.Item>
        <Menu.Item leftSection={<IoSettings size={14} />}>
          User Settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});