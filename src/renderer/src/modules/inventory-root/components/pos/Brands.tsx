import { products } from "@renderer/store/admin/products";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Card, Text, Group, Grid, Button, ScrollArea, Stack } from "@mantine/core";
import { cartController } from "@renderer/store/cart";

export default observer(function Brand() {
    const [products_, setProducts] = useState<any[]>([]);

    useEffect(() => {
        setProducts(products.products || []);
    }, [products.products]);

    const handleSelect = (product: any) => {
        const isSelected = cartController.products.some((p) => p.id === product.id);
        if (isSelected) {
            cartController.deleteFromCart(product.id)
        } else {
            cartController.addToCart(product)
        }
    };

    return (
        <Stack>
            <Button size="lg">Brands</Button>
            <ScrollArea h={500}>
                <Grid w={`100%`} gutter={`xs`}>
                    {products_.map((product, index) => {
                        const isSelected = cartController.products.some((p) => p.id === product.id);
                        return (
                            <Grid.Col span={4} key={index}>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    style={{
                                        width: 150,
                                        cursor: "pointer",
                                        backgroundColor: isSelected ? "#d1e7dd" : "white",
                                        border: isSelected ? "2px solid #0f5132" : "1px solid #ddd",
                                    }}
                                    onClick={() => handleSelect(product)}
                                >
                                    <Group justify="center" mt="md" mb="xs">
                                        <Text fw={500}>{product.product_name}</Text>
                                        <Text c="dimmed" ta={`center`} size="sm">
                                            {product.selling_price ? `₦${product.selling_price}` : "Price not available"}
                                        </Text>
                                        <Text size="xs" c={`dimmed`}>
                                            {product.quantity} P(s) in stock
                                        </Text>
                                    </Group>
                                </Card>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </ScrollArea>
        </Stack>
    );
});