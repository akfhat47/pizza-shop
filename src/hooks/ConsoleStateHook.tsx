import React, { useContext, useEffect, useState } from "react";
import { getNextStatus } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { pushOrder, changeOrderState } from "../store/orderSlice";

export interface ConsoleContextType {
  addOrder: (order: Order) => boolean;
  getOrdersByStatus: (status: PizzaStatus) => Order[];
  time: number;
  moveToNextStage: (orderId: number) => void;
  allOrders: Order[];
  cancelOrder: (orderId: number) => void;
}

export enum PizzaType {
  VEG,
  NON_VEG,
}

export enum PizzaSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export enum PizzaBase {
  THIN,
  THICK,
}

export enum PizzaStatus {
  PLACED,
  MAKING,
  READY,
  PICKED,
  CANCELLED,
}

export interface Order {
  id: number;
  type: PizzaType;
  size: PizzaSize;
  base: PizzaBase;
  status: PizzaStatus;
  createdAt: number;
  updatedAt: number;
}

const ConsoleContext = React.createContext<ConsoleContextType | null>(null);

function ConsoleContextProvider({ children }: any) {
  const allOrders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  const [time, setTime] = useState(0); //current time (in sec)

  useEffect(() => {
    const clock = setInterval(() => {
      setTime((lastTIme) => lastTIme + 1);
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  const getOrdersByStatus = (status: PizzaStatus) => {
    return allOrders.filter((order) => order.status == status);
  };

  const addOrder = (order: Order) => {
    // check if already handeling 10 orders (placed + making)
    if (
      getOrdersByStatus(PizzaStatus.PLACED).concat(
        getOrdersByStatus(PizzaStatus.MAKING)
      ).length === 10
    )
      return false;
    order.id = allOrders.length + 1;
    order.createdAt = time;
    order.updatedAt = time;
    dispatch(pushOrder(order));
    return true;
  };

  const cancelOrder = (orderId: number) => {
    dispatch(
      changeOrderState({
        id: orderId,
        newState: PizzaStatus.CANCELLED,
        time: time,
      })
    );
  };

  const moveToNextStage = (orderId: number) => {
    dispatch(
      changeOrderState({
        id: orderId,
        newState: getNextStatus(
          allOrders.find((it) => it.id === orderId)?.status!!
        ),
        time: time,
      })
    );
    // setAllOrders(
    //   allOrders.map((order) =>
    //     order.id === orderId
    //       ? { ...order, status: getNextStatus(order.status), updatedAt: time }
    //       : order
    //   )
    // );
  };

  return (
    <ConsoleContext.Provider
      value={{
        addOrder,
        getOrdersByStatus,
        time,
        moveToNextStage,
        allOrders,
        cancelOrder,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
}

export const useConsole = () => useContext(ConsoleContext);

export { ConsoleContextProvider, ConsoleContext };
