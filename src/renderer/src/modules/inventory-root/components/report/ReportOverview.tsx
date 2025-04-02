import { Card, Grid, Text, Title } from "@mantine/core";
import { reportsLoader } from "@renderer/store/admin/reports";
import StatsCard from "@renderer/ui/common/cards/dashboard/StatsCards";
import { observer } from "mobx-react";

interface cards {
    title: string,
    value: number,
    caption?: string
}

export default observer(function OverView() {
    const over_view_data: cards[] = [
        {
            title: "Total Sales",
            value: reportsLoader.Pos_reports.total_sales,
        }, {
            title: "Total Customers",
            value: 0,
        }, {
            title: "Products Sold",
            value: reportsLoader.Pos_reports.products_sold
        }, {
            title: "Profit Margin",
            value: reportsLoader.Pos_reports.profit_margin
        }
    ]
    return (
        <>
            <Grid>
                {over_view_data.map((data, index) => (
                    <Grid.Col span={4}>
                        <StatsCard.StatsCardVert key={index} label={data.title} value={`${data.value}`} />
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
})