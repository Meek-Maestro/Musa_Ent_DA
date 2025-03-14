import { createTheme, MantineThemeOverride, PasswordInput, TextInput } from "@mantine/core";


export const mantineTheme: MantineThemeOverride = createTheme({
  // components: {
  //   TextInput: TextInput.extend({
  //     classNames: {
  //       input: styles.input,
  //       label: styles.label,
  //     },
  //   }),
  //   PasswordInput: PasswordInput.extend({
  //     classNames: {
  //       input: styles.input,
  //       label: styles.label,
  //     },
  //   }),
  // },
  globalStyles: {
    global: {
      body: {
        fontFamily: "'Poppins'",
      },
    },
  },
});

export default mantineTheme;