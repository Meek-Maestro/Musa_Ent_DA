import { Box, Button, Center, Input, ModalProps, Select, SimpleGrid, Stack } from '@mantine/core';
import { useProducts } from '../../../../hooks/by-modules/use.Products';
import { useEffect, useState } from 'react';
import { categoriesStore } from '../../../../store/admin/categories';
import { ProductStore } from '../../../../store/admin/stores';

interface innerProps extends ModalProps {
    innerProps: {
        id: string
        "product_name": string
        "cost_price":number
        "selling_price":number
        "discount": number,
        "sku": string
        "quantity": number
        "quantity_alert": number
        "description": string
        "store": number
        "category": string
    }
}

export default function EditProductModal({innerProps}:innerProps) {
    const { products_form, updateProduct, submiting } = useProducts();
    const [categories, setCategories] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);

    useEffect(() => {
        setCategories(categoriesStore.categories || []);
        setStores(ProductStore.stores || []);
        products_form.setValues(innerProps)
    }, [categoriesStore.categories, ProductStore.stores]);

    return (
        <form
            onSubmit={products_form.onSubmit(async () => {
                if (await updateProduct(innerProps.id)) {
                    products_form.reset();
                }
            })}
        >
            <Box>
                <SimpleGrid cols={2}>
                    <Stack gap={0}>
                        <label>Product Name</label>
                        <Input
                            {...products_form.getInputProps('product_name')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Cost Price</label>
                        <Input
                            {...products_form.getInputProps('cost_price')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Selling Price</label>
                        <Input
                            {...products_form.getInputProps('selling_price')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Discount</label>
                        <Input
                            {...products_form.getInputProps('discount')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Category</label>
                        <Select
                            {...products_form.getInputProps('category')}
                            data={categories.map((category) => ({
                                value: category.id.toString(),
                                label: category.name,
                            }))}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                    </Stack>
                    <Stack gap={0}>
                        <label>Current Store</label>
                        <Select
                            {...products_form.getInputProps('store')}
                            data={stores.map((store) => ({
                                value: store.id.toString(),
                                label: store.name,
                            }))}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Quantity</label>
                        <Input
                            {...products_form.getInputProps('quantity')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Low Stock Alert</label>
                        <Input
                            {...products_form.getInputProps('quantity_alert')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>SKU</label>
                        <Input
                            {...products_form.getInputProps('sku')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                        <label>Description</label>
                        <Input
                            {...products_form.getInputProps('description')}
                            styles={{
                                input: {
                                    height: '42px',
                                },
                            }}
                            mb={`md`}
                            variant="filled"
                        />
                    </Stack>
                </SimpleGrid>
                <Center mt={`md`} mx={`lg`}>
                    <Button loading={submiting} type="submit" size="lg" fullWidth radius={`md`}>
                        Edit Product
                    </Button>
                </Center>
            </Box>
        </form>
    );
}