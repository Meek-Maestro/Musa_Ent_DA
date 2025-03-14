import { useMantineTheme, AppShell } from "@mantine/core";
import LoginPage from "../../modules/auth-module/pages/AuthLoginPage";

export function AuthShell() {
    const theme = useMantineTheme();
    return (
      <AppShell
        header={{ height: 70, offset: true }}
        styles={{
          main: { paddingTop: 70, backgroundColor: theme.colors.gray[1] },
          root: { overflow: 'hidden' },
        }}
      >
        <AppShell.Main
          style={{
            minHeight: '100vh',
            paddingBottom: 24,
          }}
        >
          <LoginPage />
        </AppShell.Main>
      </AppShell>
    );
  }