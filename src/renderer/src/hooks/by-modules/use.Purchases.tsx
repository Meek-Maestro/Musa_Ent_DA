import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useForm } from "@mantine/form";
import { authManager } from "../../store/auth";
import { purchaseStore } from "../../store/admin/purchase";
import { runInAction } from "mobx";

interface IPurchaseItem {
  product_name: string;
  discount?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Ipurchase {
  id?: string;
  purchase_items: IPurchaseItem[];
  damage_items?: any[];
  purchase_gen_id: string;
  status: string;
  purchase_date: string;
  arrival_date: string;
  payment_terms?: string;
  note_for_supplier?: string;
  attachment?: string;
  supplier: number;
}

export function usePurchase() {
  const { access_token } = authManager.profile;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [purchaseId, setPurchaseId] = useState<string>(crypto.randomUUID().slice(0,13));
  const [purchasegenId, setPurchasegenId] = useState<string>(crypto.randomUUID().slice(0,13));

  useEffect(() => {
      if (!submitting) {
        setPurchasegenId(crypto.randomUUID().slice(0,13));
        setPurchaseId(crypto.randomUUID().slice(0,13));
      }
  }, [submitting]);

  const purchase_form = useForm<Ipurchase>({
    initialValues: {
      id: purchaseId,
      purchase_items: [],
      damage_items: [],
      purchase_gen_id: purchasegenId,
      status: "ordered",
      purchase_date: "",
      arrival_date: "",
      payment_terms: "",
      note_for_supplier: "",
      attachment: "",
      supplier: 0,
    },

    validate: {
      status: (value) => (value ? null : "Status is required"),
      purchase_date: (value) => (value ? null : "Purchase date is required"),
      arrival_date: (value) => (value ? null : "Arrival date is required"),
      supplier: (value) => (value ? null : "Supplier is required"),
      purchase_items: {
        product_name: (value) => (value ? null : "Product name is required"),
        quantity: (value) => (value > 0 ? null : "Quantity must be greater than 0"),
        unit_price: (value) => (value > 0 ? null : "Unit price must be greater than 0"),
        total: (value) => (value > 0 ? null : "Total must be greater than 0"),
      },
      payment_terms: (value) => (value ? null : "Payment terms is required"),
    },
  });

  async function addPurchase(formValues: any) {
    console.log("Purchase", purchase_form.values, "Form Data: ", formValues);
    setSubmitting(true);
    try {
      const response = await api.post("api/v1/purchase-orders/", formValues, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      purchase_form.reset();
      purchaseStore.loadPurchases();
      console.log("✅ Purchase Order Submitted:", response.data);
      setSubmitting(false);
      // Reset form with new IDs
      purchase_form.setValues({
        ...purchase_form.values,
        id: crypto.randomUUID().slice(5),
        purchase_gen_id: crypto.randomUUID().slice(5),
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error submitting purchase order:", error);
      setSubmitting(false);
      throw error;
    }
  }

  async function updatePurchase(id: number, formData: any):Promise<boolean> {
    if (!purchase_form.validate().hasErrors) {
      setSubmitting(true);
      try {
        const response = await api.put(`api/v1/purchase-orders/${id}/`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        purchase_form.reset();
        purchaseStore.loadPurchases();
        setSubmitting(false)
        return true
        console.log("Purchase Updated:", response.data);
      } catch (error) {
        return false
        console.error("Error updating purchase:", error);
      } finally {
        setSubmitting(false);
      }
    } else {
      return false
    }
  }

  async function deletePurchase(id: number) {
    setSubmitting(true);
    try {
      await api.delete(`api/v1/purchase-orders/${id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("Purchase Deleted");
      purchaseStore.loadPurchases();
    } catch (error) {
      console.error("Error deleting purchase:", error);
    } finally {
      setSubmitting(false);
    }
  }
  async function ReloadPurchases(){
    setSubmitting(true)
    try {
      await purchaseStore.loadPurchases()
      setSubmitting(false)
      return true
    } catch (error) {
      setSubmitting(false)
      throw error
    }
  }

  return {
    purchase_form,
    submitting,
    addPurchase,
    updatePurchase,
    deletePurchase,
    ReloadPurchases
  };
}