import React from "react";
import { Order, PizzaStatus, useConsole } from "../hooks/ConsoleStateHook";
import { formatTime, getWarningTime, statusToString, zeroPad } from "../utils";

interface StageCompProps {
  status: PizzaStatus;
}

interface OrderCompProps {
  order: Order;
  time: number;
  next: (orderId: number) => void;
}

const nextableStatuses = [
  PizzaStatus.MAKING,
  PizzaStatus.PLACED,
  PizzaStatus.READY,
];

const showWarning = (order: Order, time: number) => {
  if (
    [PizzaStatus.MAKING, PizzaStatus.PLACED, PizzaStatus.READY].some(
      (it) => it === order.status
    ) &&
    time - order.updatedAt >
      (order.status === PizzaStatus.MAKING ? getWarningTime(order.size) : 180) // get special times for status = making else 3 mins
  ) {
    return {
      backgroundColor: "red",
      color: "white",
    };
  }
  return {
    backgroundColor: "white",
    color: "black",
  };
};

function OrderComp(props: OrderCompProps) {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: 5,
        marginBottom: 10,
        justifyItems: "center",
        ...showWarning(props.order, props.time),
      }}
    >
      <h5>Order {zeroPad(props.order.id, 3)}</h5>
      {props.order.status != PizzaStatus.PICKED && (
        <p>{formatTime(props.time - props.order.updatedAt)}</p>
      )}
      {props.order.status == PizzaStatus.PICKED && <p>picked</p>}
      {nextableStatuses.some((it) => it === props.order.status) && (
        <button onClick={() => props.next(props.order.id)}>next</button>
      )}
    </div>
  );
}

export default function Stage(props: StageCompProps) {
  const console = useConsole();
  return (
    <div style={{ padding: 5, width: 150, border: "1px solid black" }}>
      <h4>{statusToString(props.status)}</h4>
      <div
        style={{
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        {console
          ?.getOrdersByStatus(props.status)
          .sort((a, b) => a.updatedAt - b.updatedAt)
          .map((order) => {
            return (
              <OrderComp
                order={order}
                time={console.time}
                next={console.moveToNextStage}
              />
            );
          })}
      </div>
    </div>
  );
}
