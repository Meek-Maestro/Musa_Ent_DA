import {
  Box,
  SimpleGrid,
  Stack,
  TextInput,
  Image,
  Text,
  Title,
  PasswordInput,
  Button,
} from "@mantine/core";
import { SiLibreofficewriter } from "react-icons/si";
import { MdEmail, MdLocationCity, MdPassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { defaultColors } from "../../../ui/constants/constants";
import { observer } from "mobx-react";
import { useAuth } from "../../../hooks/security/UseAuth";
import { loginImg } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = observer(() => {
  const { signupForm, signup, submiting } = useAuth();
  const navigate = useNavigate()
  return (
    <SimpleGrid cols={{ md: 2 }} h={`100vh`}>
      <form
        onSubmit={signupForm.onSubmit(async () => {
          signupForm.setFieldValue("role", "ADMIN")
          if (await signup()) {
            navigate("/login")
          }
        })}
        style={{ height: "100%", width: "100%" }}
      >
        <Stack
          p={{ base: 20 }}
          justify="center"
          w={`100%`}
          h={`100%`}
          align="center"
          bg={defaultColors.darkBlue}
        >
          <Title order={1} fw={700} c={`white`}>
            Hello There!
          </Title>
          <TextInput styles={{
            input: {
              paddingLeft: "40px",
            },
          }}
            {...signupForm.getInputProps("business_name")}
            leftSection={
              <SiLibreofficewriter size={30} style={{ marginLeft: 10 }} />
            }
            w={{ md: "50%", base: "90%" }}
            label="Business Name"
          />
          <TextInput
            styles={{
              input: {
                paddingLeft: "40px",
              },
            }}
            {...signupForm.getInputProps("email")}
            w={{ md: "50%", base: "90%" }}
            leftSection={<MdEmail size={30} style={{ marginLeft: 10 }} />}
            label="Business Email"
          />
          <TextInput
            {...signupForm.getInputProps("business_location")}
            w={{ md: "50%", base: "90%" }}
            leftSection={<MdLocationCity size={30} style={{ marginLeft: 10 }} />}
            styles={{
              input: {
                paddingLeft: "40px",
              },
            }}
            label="Business Location"
          />
          <TextInput
            {...signupForm.getInputProps("username")}
            w={{ md: "50%", base: "90%" }}
            leftSection={<MdLocationCity size={30} style={{ marginLeft: 10 }} />}
            styles={{
              input: {
                paddingLeft: "40px",
              },
            }}
            label="Username"
          />
          <TextInput type="password"
            w={{ md: "50%", base: "90%" }}
            {...signupForm.getInputProps("password")}
            styles={{
              input: {
                paddingLeft: `40px`
              },
             
            }}
           
            leftSection={<MdPassword size={30} style={{ marginLeft: 10 }} />}
            label="Password"
          />

          <TextInput type="password"
            {...signupForm.getInputProps("confirmPassword")}
            w={{ md: "50%", base: "90%" }}
            styles={{
              input: {
                paddingLeft: "40px",
              }  
            }}
            leftSection={
              <MdPassword size={30} style={{ marginLeft: 10 }} />
            }
            label="Confirm Password"
          />
          <Button
            loading={submiting}
            type="submit"
            variant="filled"
            w={`182px`}
            size="lg"
            h={`46`}
            radius={`xl`}
            color={defaultColors.lightBlue}
          >
            Sign Up
          </Button>
          <Text c={`white`} fw={700} size="md">
            Already have an account?{" "}
            <Link style={{ color: "white" }} to="/">
              Sign In
            </Link>
          </Text>
        </Stack>
      </form>
      <Box visibleFrom="md" style={{ height: "100%", width: "100%" }}>
        <Image
          src={loginImg}
          style={{ objectFit: "contain", height: "100%", width: "100%" }}
        />
      </Box>
    </SimpleGrid>
  );
});

export default SignUpPage;
