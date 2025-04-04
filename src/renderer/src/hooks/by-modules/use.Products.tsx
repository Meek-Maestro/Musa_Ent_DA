import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { products } from "../../store/admin/products"
import { authManager } from "../../store/auth"
import { useForm } from "@mantine/form"
import { api } from "../../api/api"
import { ProductStore } from "../../store/admin/stores"

interface IproductsInput {
  "product_name": string
  "cost_price": number
  "selling_price": number
  "discount": number
  "sku": string
  "quantity": number
  "quantity_alert": number
  "description": string
  "store": number,
  "category": string
}

export function useProducts() {
  const { access_token } = authManager.profile
  const [submiting, setSubmiting] = useState(false)
  const products_form = useForm<IproductsInput>({
    initialValues: {
      product_name: "",
      cost_price: 0,
      selling_price: 0,
      discount: 0,
      sku: "",
      quantity: 0,
      quantity_alert: 0,
      description: "",
      store: 0,
      category: "",
    },
    validate: {
      product_name: (value) => (value ? null : "Product Name is required"),
      cost_price: (value) =>
        value && !isNaN(value) ? null : "Cost Price must be a number",
      selling_price: (value) =>
        value && !isNaN(value) ? null : "Selling Price must be a number",
      discount: (value) =>
        value && !isNaN(value) ? null : "Discount must be a number",
      sku: (value) => (value ? null : "SKU is required"),
      quantity: (value) =>
        value && !isNaN(value) ? null : "Quantity must be a number",
      quantity_alert: (value) =>
        value && !isNaN(value) ? null : "Quantity alert must be a number",
      store: (value) => (value ? null : "Select a store"),
      category: (value) => (value ? null : "Category is required"),
    },
  });
  function startAddOperation() {
    modals.openContextModal({
      modal: "render_addProduct",
      title: <Text size="xl" fw={700}>Add New Product</Text>,
      fullScreen: false,
      centered: true,
      size: "xl",
      padding: "md",
      innerProps: {
      }
    })
  }
  function startEditOperation(data: any) {
    console.log(data)
    modals.openContextModal({
      modal: "render_editProduct",
      title: <Text size="xl" fw={700}>Edit Product</Text>,
      fullScreen: false,
      centered: true,
      size: "xl",
      padding: "md",
      innerProps: {
        id: data?.id,
        "product_name": data?.product_name,
        "cost_price": data?.cost_price,
        "selling_price": data?.selling_price,
        "discount": data?.discount,
        "sku": data?.sku,
        "quantity": data?.quantity,
        "quantity_alert": data.quantity_alert,
        "description": data?.description,
        "store": data?.store?.name,
        "category": data?.category?.name
      }
    })
  }

  async function saveProduct() {
    console.log(products_form.values)
    setSubmiting(true);
    try {
      await api.post(
        "/api/v1/products/",
        products_form.values,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      products.loadProducts()
      ProductStore.loadStores()
      ProductStore.loadStockReports()
      setSubmiting(false);
      return true;
    } catch (error) {
      console.log(error)
      setSubmiting(false);
      return false;
    }
  }
  async function updateProduct(id: string) {
    console.log(products_form.values)
    setSubmiting(true);
    try {
      await api.put(
        `/api/v1/products/${id}/`,
        products_form.values,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      products.loadProducts()
      ProductStore.loadStores()
      ProductStore.loadStockReports()
      setSubmiting(false);
      return true;
    } catch (error) {
      console.log(error)
      setSubmiting(false);
      return false;
    }
  }
  async function deleteProduct(id: string) {
    setSubmiting(true);
    try {
      await api.delete(
        `/api/v1/products/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      products.loadProducts()
      ProductStore.loadStores()
      ProductStore.loadStockReports()
      setSubmiting(false);
      return true;
    } catch (error) {
      setSubmiting(false);
      return false;
    }
  }

  return {
    products_form,
    startAddOperation,
    startEditOperation,
    saveProduct,
    deleteProduct,
    updateProduct,
    submiting
  }
}