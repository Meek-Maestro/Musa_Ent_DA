import React, { forwardRef } from "react";


export const StockReportPrint = forwardRef<HTMLDivElement, { store: any }>(({ store }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Stock Report</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Location</th>
            <th>Store Keeper</th>
            <th>Total Products</th>
            <th>Stock Level</th>
          </tr>
        </thead>
        <tbody>
          {store.map((item: any, index: number) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.store_keeper ? item.store_keeper : "NIL"}</td>
                <td>{item.stock_report.total_products}</td>
                <td>{item.stock_report.stock_level}</td>
              </tr>

              {/* Nested Table for Products */}
              <tr>
                <td colSpan={6}>
                  <h4 style={{ textAlign: "center", marginTop: "10px" }}>Products</h4>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Low Stock Alert</th>
                        <th>Selling Price</th>
                        <th>Cost Price</th>
                        <th>Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products.map((product: any, productIndex: number) => (
                        <tr key={productIndex}>
                          <td>{product.product_name}</td>
                          <td>{product.sku}</td>
                          <td>{product.quantity}</td>
                          <td>{product.quantity_alert}</td>
                          <td>{product.selling_price}</td>
                          <td>{product.cost_price}</td>
                          <td>{product.discount}</td>
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
});

