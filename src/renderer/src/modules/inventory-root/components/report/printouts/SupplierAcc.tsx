import { SupplierAccounting } from "@renderer/interface";
import React, { forwardRef } from "react";

const SupplierAccountingPrint = forwardRef<HTMLDivElement, { supplierAccounting: SupplierAccounting[] }>(
  ({ supplierAccounting }, ref) => {
    return (
      <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Supplier Accounting Report</h2>
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
            {supplierAccounting.map((item, index) => (
              <React.Fragment key={index}>
                {/* Main Row */}
                <tr>
                  <td>{item.id}</td>
                  <td>{item.supplier_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.balance}</td>
                  <td>{item.credit_limit}</td>
                </tr>

                {/* Nested Table for Accounting */}
                <tr>
                  <td colSpan={5}>
                    <h4 style={{ textAlign: "center", marginTop: "10px" }}>Accounting</h4>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                        borderLeft: "1px solid blue",
                      }}
                    
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Payment Date</th>
                          <th>Payment Method</th>
                          <th>Amount Paid</th>
                          <th>Received By</th>
                          <th>Memo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.accounting.map((accounting: any, accountIndex: number) => (
                          <tr key={accountIndex}>
                            <td>{accounting.id}</td>
                            <td>{accounting.payment_date}</td>
                            <td>{accounting.payment_method}</td>
                            <td>{accounting.amount_paid}</td>
                            <td>{accounting.received_by}</td>
                            <td>{accounting.memo}</td>
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

export default SupplierAccountingPrint;