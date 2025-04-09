import {  SupplierReport } from "@renderer/interface";
import { forwardRef } from "react";

const SupplierPrint = forwardRef<HTMLDivElement, { supplier: SupplierReport[] }>(
  ({ supplier }, ref) => {
    return (
      <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Supplier Report</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Phone Number</th>
              <th>Balance</th>
              <th>Credit Limit</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.supplier_name}</td>
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

export default SupplierPrint;