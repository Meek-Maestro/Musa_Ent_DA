import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { useState } from "react"
import { api } from "../../api/api"
import { useForm } from "@mantine/form"
import { Customers } from "../../interface"
import { authManager } from "../../store/auth"
import { customerStore } from "../../store/admin/customers"

export function useCustomerOperations() {
  const { access_token } = authManager.profile

  const [submiting, setSubmiting] = useState(false)
  const customer_form = useForm<Customers>({
    initialValues: {
      "customer_name": "",
      "phone_number": "",
      "bank_name": "",
      "bank_account_number": "",
      "credit_limit": 0,
      "address": "",
      "status": "active"
    },
    validate: {
      "customer_name": (value) => value ? null : "Customer Name is required",
      "phone_number": (value) => value ? null : "Phone Number is required",
      "bank_name": (value) => value ? null : "Bank Name is required",
      "bank_account_number": (value) => value ? null : "Bank Account Number is required",
      "credit_limit": (value) => value ? null : "",
      "address": (value) => value ? null : "Address is required",
      "status": (value) => value ? null : "Status is required",
    }

  })
  function startAddCustomerOperation() {
    modals.openContextModal({
      modal: "render_addCustomers",
      title: <Text size="xl" fw={700}>Add new customer</Text>,
      fullScreen: false,
      centered: true,
      size: "xl",
      padding: "md",
      innerProps: {
      }
    })
  }
  function startEditCustomerOperation(data: any) {
    modals.openContextModal({
      modal: "render_editCustomer",
      title: <Text size="xl" fw={700}>Edit Customer</Text>,
      fullScreen: false,
      centered: true,
      size: "xl",
      padding: "md",
      innerProps: {
        id: data?.id,
        "customer_name": data?.customer_name,
        "phone_number": data?.phone_number,
        "bank_name": data?.bank_name,
        "bank_account_number": data?.bank_account_number,
        "credit_limit":data?.credit_limit,
        "address": data?.address,
        "status": data?.status
      }
    })
  }

  async function saveCustomer(): Promise<boolean> {
    setSubmiting(true);
    try {
      await api.post(
        "/api/v1/customers/",
        customer_form.values,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      customerStore.loadCustomers()
      setSubmiting(false);
      return true;
    } catch (error) {
      setSubmiting(false);
      console.log(error);
      return false;
    }
  }
  async function updateCustomer(id: number): Promise<boolean> {
    setSubmiting(true)
    try {
      await api.put(`/api/v1/customers/${id}/`, customer_form.values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      customerStore.loadCustomers()
      setSubmiting(false)
      return true
    } catch (error) {
      console.log(error)
      setSubmiting(false)
      return false
    }
  }
  async function deleteCustomer(id: string): Promise<boolean> {
    setSubmiting(true)
    try {
      await api.delete(`/api/v1/customers/${id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      setSubmiting(false)
      customerStore.loadCustomers()
      return true
    } catch (error) {
      console.log(error)
      setSubmiting(false)
      return false
    }
  }
  return {
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    startAddCustomerOperation,
    startEditCustomerOperation,
    customer_form,
    submiting,

  }
}