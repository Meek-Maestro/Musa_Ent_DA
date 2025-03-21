import { Box, Button, Divider, Group, Modal, NumberInput, SimpleGrid, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { observer } from "mobx-react";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import AppPageWrapper from "../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../ui/common/user-button/User-button";
import Cart from "../../components/pos/Cart";
import ProductModal from "@renderer/ui/common/modals/product-details/ProductModal";
import { runInAction } from "mobx";
import CustomerDetails from "@renderer/ui/common/modals/customer-details/CustomerDetails";

interface CartDetails {
    product_name: string;
    cost: number;
    quantity: number;
    total: number;
}

const POS = observer(() => {
    const [products, setProducts] = useState<CartDetails[]>([]);
    const [quantity, setQuantity] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<any>({});
    const [selectedCustomer, setSelectedCustomer] = useState<any>({})
    const [errors, setErrors] = useState({
        productName: "",
        cost: "",
        quantity: "",
    });

    console.log(selectedCustomer)

    const validateFields = () => {
        const newErrors = {
            productName: selectedProduct?.product_name ? "" : "Product Name is required",
            cost: selectedProduct?.cost_price ? "" : "Cost is required",
            quantity: quantity > 0 ? "" : "Quantity must be greater than 0",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleAddToCart = () => {
        if (!validateFields()) return;

        setProducts((prev) => [
            ...prev,
            {
                product_name: selectedProduct?.product_name,
                cost: selectedProduct.cost_price,
                quantity: quantity,
                total: quantity * selectedProduct.cost_price,
            },
        ]);
        runInAction(() => {
            setSelectedProduct({});
            setQuantity("");
        });
    };

    const handleDeleteFromCart = (index: number) => {
        setProducts((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClearCart = () => {
        setProducts([]);
    };

    return (
        <AppPageWrapper title="POS" right={<UserButton />}>
            <SimpleGrid >
                {/* Product Details */}
                <SimpleGrid cols={2}>
                    <Stack bg={`white`} p={`sm`} style={{ borderRadius: "20px" }}>
                        <Stack>
                            <Group>
                                <Button radius="lg" w="200px" h={`25px`} onClick={() => setOpenModal(!openModal)}>
                                   Select Product
                                </Button>
                                <Button radius="lg" w="200px" h={`25px`} onClick={() => setOpenModal(!openModal)}>
                                    Select Store
                                </Button>
                            </Group>

                            <Divider />
                            <TextInput
                                variant="filled"
                                size="md"
                                label="Product Name"
                                value={selectedProduct?.product_name || ""}
                                error={errors.productName}
                            />
                            <TextInput
                                variant="filled"
                                size="md"
                                label="Cost"
                                type="number"
                                value={selectedProduct?.cost_price || ""}
                                error={errors.cost}
                            />
                            <NumberInput
                                variant="filled"
                                size="md"
                                label="Quantity"

                                value={quantity}
                                onChange={setQuantity}
                                error={errors.quantity}
                            />
                        </Stack>
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
                    {/* Customer Details */}
                    <Stack bg={`white`} p={`sm`} style={{ borderRadius: "20px" }}>
                        <Stack>
                            <Button radius="lg" w="200px" h={`25px`} onClick={() => setOpenCustomerModal(!openCustomerModal)}>
                                Customer Details
                            </Button>
                            <Divider />
                            <TextInput
                                variant="filled"
                                size="md"
                                label="Customer's Full Name"
                                value={selectedCustomer?.customer_name || ""}
                                onChange={(e) =>
                                    setSelectedCustomer((prev: any) => ({ ...prev, customer_name: e.target.value }))
                                }
                            />
                            <TextInput
                                variant="filled"
                                size="md"
                                label="Customer Phone"
                                value={selectedCustomer?.phone_number || ""}
                                onChange={(e) =>
                                    setSelectedCustomer((prev: any) => ({ ...prev, phone_number: e.target.value }))
                                }
                            />
                            <TextInput
                                variant="filled"
                                size="md"
                                label="Customer's Address"
                                value={selectedCustomer?.address || ""}
                                onChange={(e) =>
                                    setSelectedCustomer((prev: any) => ({ ...prev, address: e.target.value }))
                                }
                            />
                        </Stack>
                    </Stack>

                </SimpleGrid>


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
            </SimpleGrid>

            <Modal size={`100%`} opened={openModal} onClose={() => setOpenModal(false)}>
                <Box style={{ overflow: "hidden" }}>
                    <Title order={3}>Products</Title>
                    <Divider my={`md`} />
                    <ProductModal onselect={setSelectedProduct} closeModal={() => setOpenModal(false)} />
                </Box>
            </Modal>
            <Modal size={`70%`} centered opened={openCustomerModal} onClose={() => setOpenCustomerModal(false)}>
                <Box style={{ overflow: "hidden" }}>
                    <Title order={3}>Customers</Title>
                    <Divider my={`md`} />
                    <CustomerDetails onselect={setSelectedCustomer} closeModal={() => setOpenCustomerModal(false)} />
                </Box>
            </Modal>
        </AppPageWrapper>
    );
});

export default POS;