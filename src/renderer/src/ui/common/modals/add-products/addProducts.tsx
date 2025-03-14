import { Box, Button, Center, Input, NumberInput, Select, SimpleGrid, Stack } from '@mantine/core';
import { useProducts } from '../../../../hooks/by-modules/use.Products';
import { useEffect, useState } from 'react';
import { categoriesStore } from '../../../../store/admin/categories';
import { ProductStore } from '../../../../store/admin/stores';

export default function AddProductModal() {
  const { products_form, saveProduct, submiting } = useProducts();
  const [categories, setCategories] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    setCategories(categoriesStore.categories || []);
    setStores(ProductStore.stores || []);
  }, [categoriesStore.categories, ProductStore.stores]);

  return (
    <form
      onSubmit={products_form.onSubmit(async () => {
        if (await saveProduct()) {
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
              type='number'
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
              type='number'
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
              type='number'
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
            type='number'
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
            type='number'
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
            Add Product
          </Button>
        </Center>
      </Box>
    </form>
  );
}