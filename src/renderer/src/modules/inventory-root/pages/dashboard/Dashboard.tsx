import { Box, Button, Grid } from "@mantine/core"
import AppPageWrapper from "../../../../ui/common/AppPageWrapper"
import { UserButton } from "../../../../ui/common/user-button/User-button"
import { defaultColors } from "../../../../ui/constants/constants"
import { useNavigate } from "react-router-dom"
import StatsCard from "@renderer/ui/common/cards/dashboard/StatsCards"
import { useEffect } from "react"
import { products } from "@renderer/store/admin/products"
import { useSummary } from "@renderer/hooks/stats/useInventorySummary"


const DashBoard = () => {
    const { TotalProducts,
        TotalStock,
        LowStocks,
        OutOfStocks } = useSummary()
    const navigate = useNavigate()
    useEffect(() => {
        products.products.length
    }, [products.products])

    return (
        <AppPageWrapper title={"Dashboard"} right={<UserButton />}>
            <Box px={`lg`}>
                <Grid>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={TotalProducts.toString()}
                            label="Total Products"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={TotalStock}
                            label="Available Stock"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={LowStocks.toString()}
                            label="Low Products"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <StatsCard.StatsCardVert
                            value={OutOfStocks.toString()}
                            label="Out of Stock"
                        // Icon={MdOutlineStoreMallDirectory}
                        />
                    </Grid.Col>
                </Grid>

                <Box>
                    <Button color={defaultColors.darkBlue} onClick={() => navigate("/pos")}>
                        POS
                    </Button>
                </Box>
            </Box>
        </AppPageWrapper>
    )
}

export default DashBoard