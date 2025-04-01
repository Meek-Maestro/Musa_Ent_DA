import { Card, Grid, Text, Title } from "@mantine/core";
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
            value: 0,
        },{
            title: "Total Customers",
            value: 0,
        },{
            title: "Products Sold",
            value: 0
        },{
            title: "Profit Margin",
            value: 0
        }
    ]
    return (
        <>
            <Grid>
                {over_view_data.map((data, index) => (
                    <Grid.Col span={4}>
                        <Card key={index} p={`lg`} shadow="sm" h={`100px`}>
                        <Text size="sm" c={`dimmed`}>{data.title}</Text>
                        <Title>{data.value}</Title>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
})