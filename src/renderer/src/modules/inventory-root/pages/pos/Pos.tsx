import { Box, Button, Grid, Group, Input, SimpleGrid, Stack } from "@mantine/core";
import { observer } from "mobx-react";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import { IoCart } from "react-icons/io5";
import { FaPrint } from "react-icons/fa6";
import { defaultColors } from "../../../../ui/constants/constants";
import Cart from "../../components/pos/Cart";

const POS = observer(() => {

    return (
        <AppPageWrapper title="POS" right={<UserButton />}>
            <Grid gutter={`lg`} bg={`white`} p={`lg`}>
                <Grid.Col span={3}>
                    <Stack>
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                    </Stack>

                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack>
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Group grow>
                            <Button radius={`md`} h={`40px`} color={defaultColors.lightGreen} leftSection={<IoCart size={20} />}>
                                Add Cart
                            </Button>
                            <Button radius={`md`} h={`40px`} color={defaultColors.darkBlue} leftSection={<FaPrint size={20} />}>
                                Print
                            </Button>
                        </Group>
                    </Stack>

                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack>
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />

                    </Stack>

                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack>
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />
                        <Input variant="filled" styles={{
                            input: {
                                height: "42px",
                                border: "1px solid grey"
                            }
                        }} />

                    </Stack>

                </Grid.Col>
            </Grid>

            <SimpleGrid cols={2} mt={`md`}>
                <Box>
                    <Cart />
                </Box>
            </SimpleGrid>
        </AppPageWrapper>

    )
})

export default POS