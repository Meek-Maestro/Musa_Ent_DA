import { Box } from "@mantine/core";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";

function Accounting() {
    return ( 
        <AppPageWrapper title={"Accounting"} right={<UserButton/>}>
            <Box>

            </Box>
        </AppPageWrapper>
     );
}

export default Accounting;