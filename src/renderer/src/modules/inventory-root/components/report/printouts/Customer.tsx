import { CustomerReport } from "@renderer/interface";
import React, { forwardRef } from "react";

const CustomerPrint = forwardRef<HTMLDivElement, { customers: CustomerReport[] }>(
  ({ customers }, ref) => {
    return (
      <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Customer Report</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Balance</th>
              <th>Credit Limit</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.customer_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.balance}</td>
                <td>{item.credit_limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default CustomerPrint;