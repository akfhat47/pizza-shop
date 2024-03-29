import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Order, PizzaStatus } from "../hooks/ConsoleStateHook";
import { getNextStatus } from "../utils";

export interface OrderSliceState {
  orders: Order[];
}

const initialState: OrderSliceState = {
  orders: [],
};

export interface ChangeOrderStatePayload {
  id: number;
  time: number;
  newState: PizzaStatus;
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    pushOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    changeOrderState: (
      state,
      action: PayloadAction<ChangeOrderStatePayload>
    ) => {
      const index = state.orders.findIndex((it) => it.id === action.payload.id);
      state.orders[index].status = action.payload.newState;
      state.orders[index].updatedAt = action.payload.time;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushOrder, changeOrderState } = orderSlice.actions;

export default orderSlice.reducer;
