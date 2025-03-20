import {
    Box, Button, Divider, Group, Modal, SimpleGrid, Stack, Textarea, TextInput,
    Title
} from "@mantine/core";
import { observer } from "mobx-react";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import Cart from "../../components/pos/Cart";
import ProductModal from "@renderer/ui/common/modals/product-details/ProductModal";
import { runInAction, set } from "mobx";

interface CartDetails {
    product_name: string;
    cost: number;
    quantity: number;
    total: number;
}

const POS = observer(() => {
    const [products, setProducts] = useState<CartDetails[]>([]);
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState<any>(null);
    const [cost, setCost] = useState<any>();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<any>({});

    console.log(selectedProduct)

    const handleAddToCart = () => {
        if (!selectedProduct) return;
        setProducts(prev => [...prev,
        {
            product_name: selectedProduct?.product_name,
            cost: selectedProduct.cost_price,
            quantity: quantity,
            total: quantity * selectedProduct.cost_price
        }]);
        runInAction(() => {
            setSelectedProduct({})
            setQuantity("")
        })
        // setCost(null)
        // setProductName("")
        // setQuantity(null)
    };

    const handleDeleteFromCart = (index: number) => {
        setProducts(prev => prev.filter((_, i) => i !== index));
    };

    const handleClearCart = () => {
        setProducts([]);
    };


    return (
        <AppPageWrapper title="POS" right={<UserButton />}>
            <Stack>
                {/* Product Details */}
                <Stack>
                    <Button radius="lg" w="200px" onClick={() => setOpenModal(!openModal)}>Product Details</Button>
                    <Divider />
                    <Group grow>
                        <TextInput
                            size="md"
                            label="Product Name"
                            value={selectedProduct?.product_name || ""}
                        // onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextInput
                            size="md"
                            label="Cost"
                            type="number"
                            value={selectedProduct?.cost_price || ""}
                        // onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                        />
                        <TextInput
                            size="md"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </Group>
                    <Stack w="30%">
                        <Textarea label="Description" value={selectedProduct?.description || ""} />
                        <Button
                            leftSection={<FaCartPlus size={20} />}
                            onClick={handleAddToCart}
                            disabled={!selectedProduct}
                        >
                            Add to Cart
                        </Button>
                    </Stack>
                </Stack>

                {/* Cart Display */}
                <SimpleGrid cols={1} mt="md">
                    <Box>
                        <Cart
                            cartdetails={products}
                            delete_action={handleDeleteFromCart}
                            clear_cart={handleClearCart}
                        />
                    </Box>
                </SimpleGrid>
            </Stack>

            <Modal size={`100%`} opened={openModal} onClose={() => setOpenModal(false)}>
                <Box style={{ overflow: "hidden" }}>
                    <Title order={3}>Products</Title>
                    <Divider my={`md`} />
                    <ProductModal onselect={setSelectedProduct} closeModal={() => setOpenModal(false)} />
                </Box>
            </Modal>
        </AppPageWrapper>
    );
});

export default POS;
