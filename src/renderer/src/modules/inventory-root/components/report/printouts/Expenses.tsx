import { ExpenseReport } from "@renderer/interface";
import { forwardRef } from "react";

const ExpensePrint = forwardRef<HTMLDivElement, { expense: ExpenseReport | null }>(
    ({ expense }, ref) => {
        return (
            <div ref={ref} style={{ padding: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Expense Report</h2>
                <hr />

                <h3>Total Expense: ₦{expense?.total_amount}</h3>

                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense?.expenses.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                                <td>{item.date.slice(0, 10)}</td>
                                <td>{item.created_at.slice(0, 10)}</td>
                                <td>{item.updated_at.slice(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
);

export default ExpensePrint;