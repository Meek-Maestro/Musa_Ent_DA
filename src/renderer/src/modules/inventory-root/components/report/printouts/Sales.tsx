import React, { forwardRef } from "react";

const FinancialPrint = forwardRef<HTMLDivElement, { pos: any }>(({ pos }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
      {/* Summary Section */}
      <div>
        <p>Total Sales: ₦{pos?.total_sales}</p>
        <p>Total Customers: {pos?.customers}</p>
        <p>Profit Margin: {pos?.profit_margin}%</p>
        <p>Products Sold: {pos?.products_sold}</p>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>POS Report</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headerStyle}>Customer</th>
            <th style={headerStyle}>Store</th>
            <th style={headerStyle}>Payment Method</th>
            <th style={headerStyle}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {pos?.pos.map((item, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr>
                <td style={cellStyle}>{item.customer ? item.customer : "Walk In Customer"}</td>
                <td style={cellStyle}>{item.store.name}</td>
                <td style={cellStyle}>{item.payment_method}</td>
                <td style={cellStyle}>{item.created_at.slice(0, 10)}</td>
              </tr>

              {/* Nested Table for Products */}
              <tr>
                <td colSpan={6}>
                  <table style={{ width: "100%", borderCollapse: "collapse", paddingLeft:"20px", paddingRight:"20px" }} >
                    <thead>
                      <tr>
                        <th style={nestedHeaderStyle}>Product Name</th>
                        <th style={nestedHeaderStyle}>SKU</th>
                        <th style={nestedHeaderStyle}>Cost</th>
                        <th style={nestedHeaderStyle}>Discount</th>
                        <th style={nestedHeaderStyle}>Quantity</th>
                        <th style={nestedHeaderStyle}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products.map((product, productIndex) => (
                        <tr key={productIndex}>
                          <td style={nestedCellStyle}>{product.product_name}</td>
                          <td style={nestedCellStyle}>{product.sku}</td>
                          <td style={nestedCellStyle}>₦{product.cost}</td>
                          <td style={nestedCellStyle}>{product.discount}</td>
                          <td style={nestedCellStyle}>{product.quantity}</td>
                          <td style={nestedCellStyle}>
                            ₦{((product.cost - product.discount) * product.quantity).toFixed(2)}
                          </td>
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

      <hr style={{ margin: "20px 0" }} />

      
    </div>
  );
});

const headerStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left" as const,
  backgroundColor: "#f2f2f2",
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
};

const nestedCellStyle = {
  border: "1px solid #ddd",
  padding: "6px",
  fontSize: "12px",
};

export default FinancialPrint;