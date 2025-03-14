import { ActionIcon, Box, Button, Divider, Group, Input, Paper, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import AppPageWrapper from "../../../../../ui/common/AppPageWrapper";
import { UserButton } from "../../../../../ui/common/user-button/User-button";
import { useEffect, useState } from "react";
import { MdArrowBack, MdDelete } from "react-icons/md";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePurchase } from "../../../../../hooks/by-modules/use.Purchases";
import { SupplierStore } from "../../../../../store/admin/suppliers";
import { purchaseStore } from "../../../../../store/admin/purchase";
import { FaPlus } from "react-icons/fa6";

export default function EditPurchase() {
  const [purchase, setPurchase] = useState<any>({});
  const [purchaseId, setPurchaseId] = useState(0);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { purchase_form, updatePurchase, submitting } = usePurchase();
  const [suppliers, setSupplier] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [d_items, setD_items] = useState(false);
  const [damagedItems, setDamagedItems] = useState<any[]>([{ product_name: "", quantity: 0, unit_price: 0, discount: 0, total: 0 }]);
  const navigate = useNavigate();

  useEffect(() => {
    const idFromParams = params.id;
    const idFromSearchParams = searchParams.get("id");
    const id = idFromParams || idFromSearchParams || location?.state || "";
    const foundPurchase = purchaseStore.purchases.find((p: any) => p.id.toString() === id.toString()) ?? [];
    console.log(foundPurchase);
    if (foundPurchase) {
      setPurchase(foundPurchase);
      setItems(foundPurchase?.purchase_items ? JSON.parse(JSON.stringify(foundPurchase.purchase_items)) : []);
      setDamagedItems(foundPurchase?.damage_items ? JSON.parse(JSON.stringify(foundPurchase.damage_items)) : []);

      setPurchaseId(id);
      purchase_form.setFieldValue("id", foundPurchase.id);
      purchase_form.setFieldValue("supplier", foundPurchase.supplier.id.toString());
      purchase_form.setFieldValue("purchase_date", new Date(foundPurchase.purchase_date).toISOString().split('T')[0]);
      purchase_form.setFieldValue("arrival_date", new Date(foundPurchase.arrival_date).toISOString().split('T')[0]);
      purchase_form.setFieldValue("payment_terms", foundPurchase.payment_terms);
      purchase_form.setFieldValue("note_for_supplier", foundPurchase.note_for_supplier);
      purchase_form.setFieldValue("status", foundPurchase.status);
    }
  }, [location.state]);

  const handleAddItem = () => {
    setItems([...items, { product_name: "", quantity: 0, unit_price: 0, discount: "", total: 0 }]);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    purchase_form.setFieldValue("purchase_items", newItems);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    purchase_form.setFieldValue("purchase_items", newItems);
  };

  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAttachment(event.target.files[0]);
    }
  };

  const handleAddDamagedItem = () => {
    setDamagedItems([...damagedItems, { product_name: "", quantity: 0, unit_price: 0, discount: 0, total: 0 }]);
  };

  const handleDeleteDamagedItem = (index: number) => {
    const newDamagedItems = damagedItems.filter((_, i) => i !== index);
    setDamagedItems(newDamagedItems);
    purchase_form.setFieldValue("damage_items", newDamagedItems);
  };

  const handleDamagedItemChange = (index: number, field: string, value: string | number) => {
    const newDamagedItems = [...damagedItems];
    newDamagedItems[index][field] = field === "quantity" || field === "unit_price" || field === "discount" || field === "total" ? parseFloat(value as string) : value;
    setDamagedItems(newDamagedItems);
    purchase_form.setFieldValue("damage_items", newDamagedItems);
  };

  useEffect(() => {
    setSupplier(SupplierStore.suppliers || []);
  }, [SupplierStore.suppliers]);

  useEffect(() => {
    purchase_form.setFieldValue("purchase_items", items);
    purchase_form.setFieldValue("damage_items", damagedItems || []);
  }, [items, damagedItems]);

  return (
    <>
      <AppPageWrapper title="Edit Purchase" right={<UserButton />}>
        <ActionIcon size={`xl`} mb={`md`} onClick={() => navigate("/expenses")}>
          <MdArrowBack size={30} />
        </ActionIcon>
        <form
          onSubmit={purchase_form.onSubmit(async () => {
            const formData = new FormData();

            //Purchase Items parse Int format
            Object.entries(purchase_form.values).forEach(([key, value]) => {
              if (key === "purchase_items") {
                const formattedItems = (value as any[]).map((item) => ({
                  ...item,
                  quantity: parseInt(item.quantity, 10) || 0,
                  total: parseInt(item.total, 10) || 0,
                  unit_price: parseInt(item.unit_price, 10) || 0,
                  discount: parseInt(item.discount, 10) || 0,
                }));
                formData.append(key, JSON.stringify(formattedItems));
              }
              //Damaged Products Parse Int
              if (key === "damage_items" && damagedItems.length > 0) {
                const formattedItems = (value as any[]).map((item) => ({
                  ...item,
                  quantity: parseInt(item.quantity, 10) || 0,
                  total: parseInt(item.total, 10) || 0,
                  unit_price: parseInt(item.unit_price, 10) || 0,
                  discount: parseInt(item.discount, 10) || 0,
                }));
                formData.append(key, JSON.stringify(formattedItems));
              }
            });
            formData.append("purchase_date", purchase_form.values.purchase_date);
            formData.append("arrival_date", purchase_form.values.arrival_date);
            formData.append("supplier", purchase_form.values.supplier.toString());
            formData.append("payment_terms", (purchase_form.values.payment_terms || "").toString());
            formData.append("note_for_supplier", (purchase_form.values.note_for_supplier || "").toString());
            formData.append("status", purchase_form.values.status.toString());
            formData.append("purchase_gen_id", purchase_form.values.purchase_gen_id.toString());
            // Append file separately
            if (attachment) {
              formData.append("attachment", attachment);
            }
            if (await updatePurchase(purchaseId, formData)) {
              navigate("/expenses");
            }
          })}
        >
          {/* First Paper */}
          <Paper radius={`md`}>
            <Box>
              <Box p={`sm`}>
                <Title order={5}>Purchase Information</Title>
              </Box>

              <Divider />
              {/* First Group */}
              <Group p={`md`} justify="space-evenly" grow>
                <Stack gap={0}>
                  <label>Order Id</label>
                  <TextInput
                    {...purchase_form.getInputProps("id")}
                    readOnly
                    styles={{
                      input: {
                        height: "42px",
                      },
                    }}
                    mb={`md`}
                    variant="filled"
                  />
                </Stack>
                <Stack gap={0}>
                  <label>Purchase Date</label>
                  <TextInput
                    {...purchase_form.getInputProps("purchase_date")}
                    type="date"
                    styles={{
                      input: {
                        height: "42px",
                      },
                    }}
                    mb={`md`}
                    variant="filled"
                  />
                </Stack>
                <Stack gap={0}>
                  <label>Arrival Date</label>
                  <TextInput
                    type="date"
                    {...purchase_form.getInputProps("arrival_date")}
                    styles={{
                      input: {
                        height: "42px",
                      },
                    }}
                    mb={`md`}
                    variant="filled"
                  />
                </Stack>
                <Stack gap={0}>
                  <label>Supplier</label>
                  <Select
                    data={suppliers.map((data: any) => ({
                      value: data.id.toString(),
                      label: data.supplier_name,
                    }))}
                    {...purchase_form.getInputProps("supplier")}
                    styles={{
                      input: {
                        height: "42px",
                      },
                    }}
                    mb={`md`}
                    variant="filled"
                  />
                </Stack>
              </Group>
              {/* First Group */}

              {/* Second Group */}
              <Stack gap={0} w={`40%`} p={`md`}>
                <label>Payment Terms</label>
                <Textarea
                  {...purchase_form.getInputProps("payment_terms")}
                  styles={{
                    input: {
                      height: "72px",
                    },
                  }}
                  mb={`md`}
                  variant="filled"
                />
              </Stack>
              {/* Second Group */}
            </Box>
          </Paper>
          {/* First Paper */}

          {/* Second Paper */}
          <Paper radius={`md`} mt={`lg`}>
            <Box>
              <Box p={`sm`}>
                <Title order={5}>Purchase Items</Title>
              </Box>

              <Divider />
              <Group justify="end" w={`100%`} p={`sm`}>
                <Button w={`200px`} onClick={handleAddItem}>
                  Add Item
                </Button>
              </Group>

              {items.map((item, index) => (
                <Group key={index} p={`md`} justify="space-between">
                  <Stack gap={0}>
                    <label>Product Name</label>
                    <Input
                      value={item.product_name}
                      onChange={(e) => handleItemChange(index, "product_name", e.target.value)}
                      styles={{
                        input: {
                          height: "42px",
                        },
                      }}
                      mb={`md`}
                      variant="filled"
                    />
                  </Stack>

                  <Stack gap={0}>
                    <label>Quantity</label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      styles={{
                        input: {
                          height: "42px",
                        },
                      }}
                      mb={`md`}
                      variant="filled"
                    />
                  </Stack>

                  <Stack gap={0}>
                    <label>Unit Price</label>
                    <Input
                      type="number"
                      value={item.unit_price}
                      onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                      styles={{
                        input: {
                          height: "42px",
                        },
                      }}
                      mb={`md`}
                      variant="filled"
                    />
                  </Stack>

                  <Stack gap={0}>
                    <label>Discount</label>
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                      styles={{
                        input: {
                          height: "42px",
                        },
                      }}
                      mb={`md`}
                      variant="filled"
                    />
                  </Stack>

                  <Stack gap={0}>
                    <label>Total</label>
                    <Input
                      type="number"
                      value={item.total}
                      onChange={(e) => handleItemChange(index, "total", e.target.value)}
                      styles={{
                        input: {
                          height: "42px",
                        },
                      }}
                      mb={`md`}
                      variant="filled"
                    />
                  </Stack>

                  <Group justify="end">
                    <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteItem(index)}>
                      <MdDelete size={24} color="red" />
                    </ActionIcon>
                  </Group>
                </Group>
              ))}
              <Box p={`md`}>
                <Text ta={`right`}>Gross Total: {items.reduce((acc, item) => acc + item.total, 0)}</Text>
              </Box>
            </Box>
          </Paper>
          {/* Second Paper */}
          <Button display={`flex`} color={d_items ? "blue" : "red"} variant="subtle" bg={`white`} size={`input-sm`} my={`md`} onClick={() => setD_items(!d_items)}>
            <FaPlus /> &nbsp; Damaged Items ?
          </Button>
          {/* Damaged Items Paper */}
          {(d_items || damagedItems.length > 0) && (
            <Paper radius={`md`}>
              <Box>
                <Box p={`sm`}>
                  <Title order={5}>Damaged Items</Title>
                </Box>

                <Divider />
                <Group justify="end" w={`100%`} p={`sm`}>
                  <Button w={`200px`} onClick={handleAddDamagedItem}>
                    Add Item
                  </Button>
                </Group>

                {damagedItems.map((item, index) => (
                  <Group key={index} p={`md`} justify="space-between">
                    <Stack gap={0}>
                      <label>Product Name</label>
                      <Input
                        value={item.product_name}
                        onChange={(e) => handleDamagedItemChange(index, "product_name", e.target.value)}
                        styles={{
                          input: {
                            height: "42px",
                          },
                        }}
                        mb={`md`}
                        variant="filled"
                      />
                    </Stack>

                    <Stack gap={0}>
                      <label>Quantity</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleDamagedItemChange(index, "quantity", e.target.value)}
                        styles={{
                          input: {
                            height: "42px",
                          },
                        }}
                        mb={`md`}
                        variant="filled"
                      />
                    </Stack>

                    <Stack gap={0}>
                      <label>Unit Price</label>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => handleDamagedItemChange(index, "unit_price", e.target.value)}
                        styles={{
                          input: {
                            height: "42px",
                          },
                        }}
                        mb={`md`}
                        variant="filled"
                      />
                    </Stack>

                    <Stack gap={0}>
                      <label>Discount</label>
                      <Input
                        type="number"
                        value={item.discount}
                        onChange={(e) => handleDamagedItemChange(index, "discount", e.target.value)}
                        styles={{
                          input: {
                            height: "42px",
                          },
                        }}
                        mb={`md`}
                        variant="filled"
                      />
                    </Stack>

                    <Stack gap={0}>
                      <label>Total</label>
                      <Input
                        type="number"
                        value={item.total}
                        onChange={(e) => handleDamagedItemChange(index, "total", e.target.value)}
                        styles={{
                          input: {
                            height: "42px",
                          },
                        }}
                        mb={`md`}
                        variant="filled"
                      />
                    </Stack>

                    <Group justify="end">
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteDamagedItem(index)}>
                        <MdDelete size={24} color="red" />
                      </ActionIcon>
                    </Group>
                  </Group>
                ))}
                <Box p={`md`}>
                  <Text ta={`right`}>Gross Total: {damagedItems.reduce((acc, item) => acc + item.total, 0)}</Text>
                </Box>
              </Box>
            </Paper>
          )}
          {/* Damaged Items Paper */}

          {/* Third Paper */}
          <Paper radius={`md`} mt={`lg`}>
            <Box p={`sm`}>
              <Title order={5}>Notes and Attachments</Title>
            </Box>
            <Divider />
            <Group p={`md`} grow>
              <Stack gap={0}>
                <label>Note for Supplier</label>
                <Textarea
                  {...purchase_form.getInputProps("note_for_supplier")}
                  styles={{
                    input: {
                      height: "72px",
                    },
                  }}
                  mb={`md`}
                  variant="filled"
                />
              </Stack>
              <Stack gap={0}>
                <label>Attachments (optional)</label>
                <Input
                  type="file"
                  onChange={handleFileChange} // Use the custom handler
                  styles={{
                    input: {
                      height: "42px",
                    },
                  }}
                  mb={`md`}
                  variant="filled"
                />
              </Stack>
              <Stack gap={0}>
                <label>Status</label>
                <Select
                  {...purchase_form.getInputProps("status")}
                  data={["Ordered", "OnTransit", "Delivered", "Cancelled"]}
                  styles={{
                    input: {
                      height: "42px",
                    },
                  }}
                  mb={`md`}
                  variant="filled"
                />
              </Stack>
            </Group>
          </Paper>
          {/* Third Paper */}

          <Stack p={`lg`}>
            <Button type="submit" loading={submitting} size="lg" mx={`lg`}>
              Update Purchase Order
            </Button>
          </Stack>
        </form>
      </AppPageWrapper>
    </>
  );
}