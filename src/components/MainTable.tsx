import React from "react";
import { PizzaStatus, useConsole } from "../hooks/ConsoleStateHook";
import { formatTime, statusToString, zeroPad } from "../utils";

const tableStyle = { border: "1px solid black" };
const cancelableStatuses = [PizzaStatus.MAKING, PizzaStatus.PLACED];
export default function MainTable() {
  const console = useConsole();
  return (
    <div style={{ width: 650, maxHeight: 500, overflowY: "auto" }}>
      {" "}
      <table
        style={{
          border: "1px solid black",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tr>
          <th style={tableStyle}>Order Id</th>
          <th style={tableStyle}>Stage</th>
          <th style={tableStyle}>Total time spent (time from order placed)</th>
          <th style={tableStyle}>Action</th>
        </tr>
        {console?.allOrders.map((order) => (
          <tr>
            <td style={tableStyle}>{zeroPad(order.id, 3)}</td>
            <td style={tableStyle}>{statusToString(order.status)}</td>
            <td style={tableStyle}>
              {[PizzaStatus.CANCELLED, PizzaStatus.PICKED].some(
                (it) => it === order.status
              )
                ? formatTime(order.updatedAt - order.createdAt)
                : formatTime(console.time - order.createdAt)}
            </td>
            <td style={tableStyle}>
              {cancelableStatuses.some((it) => it === order.status) && (
                <button onClick={() => console?.cancelOrder(order.id)}>
                  cancel
                </button>
              )}
            </td>
          </tr>
        ))}
        <tr>
          <th style={{ border: "2px solid orange" }}>Total orders delivered</th>
          <td style={{ border: "2px solid orange" }} colSpan={3}>
            {
              console?.allOrders.filter((it) => it.status == PizzaStatus.PICKED)
                .length
            }
          </td>
        </tr>
      </table>
    </div>
  );
}
