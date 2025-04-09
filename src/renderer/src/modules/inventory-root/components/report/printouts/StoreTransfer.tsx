import React, { forwardRef } from "react";

const StoreTransferPrint = forwardRef<HTMLDivElement, { storeTransfers: any[] }>(
    ({ storeTransfers }, ref) => {
        return (
            <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Store Transfer Report</h2>
                
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>ID</th>
                            <th style={headerStyle}>From Store</th>
                            <th style={headerStyle}>To Store</th>
                            <th style={headerStyle}>Quantity</th>
                            <th style={headerStyle}>Transfer Date</th>
                            <th style={headerStyle}>Created At</th>
                            <th style={headerStyle}>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeTransfers.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Main Row */}
                                <tr>
                                    <td style={cellStyle}>{item.id}</td>
                                    <td style={cellStyle}>{item.from_store}</td>
                                    <td style={cellStyle}>{item.to_store}</td>
                                    <td style={cellStyle}>{item.quantity}</td>
                                    <td style={cellStyle}>{item.transfer_date.slice(0, 10)}</td>
                                    <td style={cellStyle}>{item.created_at.slice(0, 10)}</td>
                                    <td style={cellStyle}>{item.updated_at.slice(0, 10)}</td>
                                </tr>

                                {/* Nested Table for Products */}
                                <tr>
                                    <td colSpan={7}>
                                        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Transferred Products</h4>
                                        <table
                                            style={{
                                                width: "100%",
                                                borderCollapse: "collapse",
                                                marginBottom: "20px",

                                            }}

                                        >
                                            <thead>
                                                <tr>
                                                    <th style={nestedHeaderStyle}>Product Name</th>
                                                    <th style={nestedHeaderStyle}>SKU</th>
                                                    <th style={nestedHeaderStyle}>Cost</th>
                                                    <th style={nestedHeaderStyle}>Discount</th>
                                                    <th style={nestedHeaderStyle}>Quantity</th>
                                                    <th style={nestedHeaderStyle}>Category</th>
                                                    <th style={nestedHeaderStyle}>Selling Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((product: any, productIndex: number) => (
                                                    <tr key={productIndex}>
                                                        <td style={nestedCellStyle}>{product.product_name}</td>
                                                        <td style={nestedCellStyle}>{product.sku}</td>
                                                        <td style={nestedCellStyle}>₦{product.cost_price}</td>
                                                        <td style={nestedCellStyle}>{product.discount}</td>
                                                        <td style={nestedCellStyle}>{product.quantity}</td>
                                                        <td style={nestedCellStyle}>{product.category}</td>
                                                        <td style={nestedCellStyle}>₦{product.selling_price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
);

const headerStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left" as const,
    backgroundColor: "",
    fontWeight: "bold",
};

const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
};

const nestedHeaderStyle = {
    border: "1px solid #ddd",
    padding: "6px",
    textAlign: "left" as const,
    backgroundColor: "#e6e6e6",
    fontWeight: "bold",
    fontSize: "12px",
    borderBottom: "2px solid white",
};

const nestedCellStyle = {
    border: "none",
    // borderBottom:"1px solid #ddd",
    marginBottom: "12px",
    padding: "6px",
    fontSize: "12px",
};

export default StoreTransferPrint;