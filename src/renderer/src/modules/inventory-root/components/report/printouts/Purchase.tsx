import React from "react";
import { forwardRef } from "react";

export const PurchasePrint = forwardRef<HTMLDivElement, { purchase: any }>(({ purchase }, ref) => {
    return (
        <>
            <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Purchase Report</h2>
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Status</th>
                            <th>Arrival Date</th>
                            <th>Supplier Name</th>
                            <th>Supplier Address</th>
                            <th>Supplier Contact</th>
                            <th>Payment Terms</th>
                            <th>Purchase Items Total</th>
                            <th>Damaged Items Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.map((item: any, index: number) => (
                            <React.Fragment key={index}>
                                {/* Main Row */}
                                <tr>
                                    <td>{item.purchase_gen_id}</td>
                                    <td>{item.status}</td>
                                    <td>{item.arrival_date.slice(0, 10)}</td>
                                    <td>{item.supplier_name}</td>
                                    <td>{item.supplier_address}</td>
                                    <td>{item.supplier_contact}</td>
                                    <td>{item.payment_terms}</td>
                                    <td>{item.purchase_items_total}</td>
                                    <td>{item.damage_items_total}</td>
                                </tr>

                                {/* Nested Table for Purchased Items */}
                                <tr>
                                    <td colSpan={9}>
                                        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Purchased Items</h4>
                                        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Unit Price</th>
                                                    <th>Cost</th>
                                                    <th>Quantity</th>
                                                    <th>Discount</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.purchase_items.map((product: any, productIndex: number) => (
                                                    <tr key={productIndex}>
                                                        <td>{product.product_name}</td>
                                                        <td>{product.unit_price}</td>
                                                        <td>{product.cost}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.discount}</td>
                                                        <td>{product.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                {/* Nested Table for Damaged Items */}
                                {item.damage_items.length > 0 && (
                                    <tr>
                                        <td colSpan={9}>
                                            <h4 style={{ textAlign: "center", marginTop: "10px", color: "red" }}>Damaged Items</h4>
                                            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Unit Price</th>
                                                        <th>Cost</th>
                                                        <th>Quantity</th>
                                                        <th>Discount</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.damage_items.map((product: any, productIndex: number) => (
                                                        <tr key={productIndex}>
                                                            <td>{product.product_name}</td>
                                                            <td>{product.unit_price}</td>
                                                            <td>{product.cost}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>{product.discount}</td>
                                                            <td>{product.total}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
})