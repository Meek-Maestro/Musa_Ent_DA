import { forwardRef } from "react";
import { Box, Table, Text, Group, Divider } from "@mantine/core";
import { cartController } from "@renderer/store/cart";

const POSPrint = forwardRef<HTMLDivElement>((_, ref) => {
    const { products, customer, payment_method } = cartController;

    const totalAmount = products.reduce((total, item) => total + item.sub_total * item.quantity, 0);

    return (
        <Box
            ref={ref}
            style={{
                width: "210mm",
                height: "297mm",
                padding: "20mm",
                fontSize: "12px",
            }}
        >
            {/* Receipt Title */}
            <Text ta="center" size="lg" fw={700}>
                POS Receipt
            </Text>
            <Divider my="sm" />

            {/* Customer and Payment Method */}
            <Group justify="center" gap="xl">
                <Text>Customer: {customer || "Walk In Customer"}</Text>
                <Text>Payment Method: {payment_method || "N/A"}</Text>
            </Group>
            <Divider my="sm" />

            {/* Product Table */}
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Product</th>
                        <th style={{ textAlign: "center" }}>Quantity</th>
                        <th style={{ textAlign: "center" }}>Price</th>
                        <th style={{ textAlign: "center" }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{product.product_name}</td>
                            <td style={{ textAlign: "center" }}>{product.quantity}</td>
                            <td style={{ textAlign: "center" }}>₦{product.sub_total.toFixed(2)}</td>
                            <td style={{ textAlign: "center" }}>₦{(product.sub_total * product.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Divider my="sm" />

            {/* Total Items and Amount */}
            <Group justify="center" gap="xl">
                <Text>Total Items: {products.length}</Text>
                <Text>Total Amount: ₦{totalAmount.toFixed(2)}</Text>
            </Group>
        </Box>
    );
});

export default POSPrint;