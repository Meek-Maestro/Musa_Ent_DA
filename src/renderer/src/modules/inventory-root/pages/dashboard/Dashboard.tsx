import { Box, Button, Text, TextInput, UnstyledButton } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { MdSearch } from "react-icons/md"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import { defaultColors } from "../../../../ui/constants/constants"
import { useNavigate } from "react-router-dom"


const DashBoard = () => {
    const navigate = useNavigate()

    return (
        <AppPageWrapper title={"Dashboard"} right={<UserButton />}>
            <Box>
                <Button color={defaultColors.darkBlue} onClick={() => navigate("/pos")}>
                    POS
                </Button>
            </Box>
        </AppPageWrapper>
    )
}

export default DashBoard