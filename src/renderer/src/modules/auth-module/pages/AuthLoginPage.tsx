import { Box, SimpleGrid, Stack, TextInput, Image, Text, Title, PasswordInput, Button } from "@mantine/core";
import { SiLibreofficewriter } from "react-icons/si";
import { MdEmail, MdLocationCity, MdOutlinePassword, MdPassword, MdVisibility, MdVisibilityOff, MdWifiPassword } from "react-icons/md"
import { defaultColors } from "../../../ui/constants/constants";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/security/UseAuth";
import { FaUser } from "react-icons/fa6";
import { loginbg } from "../../../assets";



const LoginPage = observer(() => {
    const { loginForm, Login, submiting } = useAuth()
    return (
        <form onSubmit={loginForm.onSubmit(async () => {
            await Login()
        })}>
            <SimpleGrid cols={{ md: 2 }} w={`100vw`} h={`100vh`} bg={defaultColors.darkBlue}>
                <Stack align="center" w={`100%`} justify="center">
                    <Stack h={`70%`} style={{ borderRadius: "65px" }} w={{ md: `60%`, base: "90%" }} p={`xl`} justify="center" align="center" bg={defaultColors.lightBlue}>
                        <Title order={1} fw={700} c={`white`}>Login</Title>
                        <TextInput styles={{
                            input:{
                                paddingLeft:"40px"
                            }
                        }} readOnly={submiting} {...loginForm.getInputProps("username")} w={{ md: "80%", base: "90%" }} leftSection={<FaUser size={30} style={{ marginLeft: 10 }} />} label="Username" />
                        <PasswordInput readOnly={submiting} {...loginForm.getInputProps("password")} w={{ md: "80%", base: "90%" }}
                            styles={{
                                visibilityToggle: {
                                    width: "100px",
                                    height: "100px",
                                }, input:{
                                    paddingLeft:"40px"
                                }
                            }}
                            visibilityToggleIcon={({ reveal, }) =>
                                reveal ? (
                                    <MdVisibility size={30} style={{ marginRight: 10 }} />
                                ) : (
                                    <MdVisibilityOff size={30} style={{ marginRight: 10 }} />
                                )
                            }
                            leftSection={<MdOutlinePassword size={30} style={{ marginLeft: 10 }} />}
                            label="Password"
                        />
                        <Button loading={submiting} type="submit" variant="filled" w={`182px`} size="lg" h={`46`} radius={`xl`} color={defaultColors.darkBlue}>Sign In</Button>
                        <Text c={`white`} fw={700} size="md">Already have an account? <Link style={{ color: "white" }} to="/signup">Sign Up</Link></Text>
                    </Stack>
                </Stack>
                <Stack visibleFrom="md" align="center" justify="center">
                    <Image src={loginbg} loading="lazy" style={{ objectFit: "contain" }} />
                </Stack>
            </SimpleGrid>
        </form>
    )

})

export default LoginPage