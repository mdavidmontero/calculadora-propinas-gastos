import { MenuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type orderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: orderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (
  state: orderState = initialState,
  action: OrderActions
) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let order: OrderItem[] = [];
    if (itemExist) {
      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      order = [...state.order, newItem];
    }

    return {
      ...state,
      order,
    };
  }
  if (action.type === "remove-item") {
    const removeOrder = state.order.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      order: removeOrder,
    };
  }
  if (action.type === "place-order") {
    const resetState: OrderItem[] = (state.order = []);
    const resetTip: number = (state.tip = 0);
    return {
      ...state,
      order: resetState,
      tip: resetTip,
    };
  }
  if (action.type === "add-tip") {
    const tip = action.payload.value;
    return {
      ...state,
      tip,
    };
  }

  return state;
};
