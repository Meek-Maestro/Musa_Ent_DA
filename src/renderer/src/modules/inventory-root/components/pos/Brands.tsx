import { products } from "@renderer/store/admin/products";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Card, Text, Group, Grid, Button, ScrollArea, Stack, Drawer, TextInput, Center, Title } from "@mantine/core";
import { cartController } from "@renderer/store/cart";
import { useDisclosure } from "@mantine/hooks";
import { ProductStore } from "@renderer/store/admin/stores";
import { MdStore } from "react-icons/md";
import { BiFilter } from "react-icons/bi";
import { CartDetails, Products } from "@renderer/interface";




export default observer(function Brand() {
    const [products_, setProducts] = useState<any[]>([]);
    const [storeName, setStore] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        setProducts(products.products || []);
    }, [products.products]);



    // Filter products based on store name and search query
    const filteredProducts = products_.filter(
        (product) =>
            (storeName === "" || product?.store?.name === storeName) && // Show all products if storeName is empty
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
    );

    const handleSelect = (product: Products) => {
        const isSelected = cartController.products.some((p) => p.id === product.id);
        if (isSelected) {
            cartController.deleteFromCart(product.id);
        } else {
            const productDetails: CartDetails = {
                id: product.id,
                product_name: product.product_name,
                sku: product.sku,
                cost: product.cost_price,
                quantity: 1,
                description: "",
                sub_total: parseInt(product.selling_price.toString(), 10),
                discount: parseInt(product.discount.toString(), 0),
            }
            cartController.addToCart(productDetails);
        }
    };

    return (
        <Stack>
            <Button size="lg" onClick={open}>
                {storeName === "" ? "General Stores" : storeName}
            </Button>
            <Drawer position="right" opened={opened} onClose={close} title="Stores">
                <Center>
                    <Button c={`dimmed`} variant="subtle" onClick={() => {
                        setStore("")
                        close()
                    }}>
                        Show all products
                    </Button>
                </Center>
                <Group p={`md`}>
                    <BiFilter size={30} />
                    <Title order={3} ta={`center`}>Filter Products by store</Title>
                </Group>

                <Grid>
                    {ProductStore.stores.map((data, index) => (
                        <Grid.Col span={6} key={index}>
                            <Card
                                withBorder
                                w={200}
                                p={`lg`}
                                onClick={() => {
                                    setStore(data.name);
                                    cartController.setStore(data.id)
                                    close();
                                }}
                            >
                                <Card.Section p={`md`}>
                                    <Stack justify="center">
                                        <MdStore size={50} />
                                        <Text size="md" fw={600}>
                                            {data.name}
                                        </Text>
                                    </Stack>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Drawer>

            {/* Search Input */}
            <TextInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                mb="md"
            />

            <ScrollArea h={400}>
                <Grid w={`100%`} gutter={`xs`}>
                    {filteredProducts.map((product, index) => {
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
                                        <Text size="xs" c={product.quantity > 0 ? `dimmed` : `red`}>
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