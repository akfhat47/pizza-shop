import React, { useState } from "react";
import {
  Order,
  PizzaBase,
  PizzaSize,
  PizzaStatus,
  PizzaType,
  useConsole,
} from "../hooks/ConsoleStateHook";

export default function AddOrder() {
  const addOrder = useConsole()?.addOrder;
  const [type, setType] = useState(PizzaType.VEG);
  const [size, setSize] = useState(PizzaSize.SMALL);
  const [base, setBase] = useState(PizzaBase.THICK);
  const onSubmit = (e: any) => {
    e.preventDefault();
    //if hook is ready and loaded
    if (addOrder) {
      const order: Order = {
        id: -1,
        type,
        size,
        base,
        status: PizzaStatus.PLACED,
        createdAt: -1,
        updatedAt: -1,
      };
      const success = addOrder(order);
      if (!success) alert("Not taking any order for now");
    }
  };
  return (
    <div style={{ width: 635, padding: 5, border: "1px solid black" }}>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          Pizza Type:
          <select
            value={type}
            onChange={(e) =>
              setType(PizzaType[e.target.value as keyof typeof PizzaType])
            }
          >
            <option value={PizzaType.VEG}>Veg</option>
            <option value={PizzaType.NON_VEG}>Non-Veg</option>
          </select>
        </label>
        <br />
        <label>
          Pizza Size:
          <select
            value={size}
            onChange={(e) =>
              setSize(PizzaSize[e.target.value as keyof typeof PizzaSize])
            }
          >
            <option value={PizzaSize.LARGE}>Large</option>
            <option value={PizzaSize.MEDIUM}>Medium</option>
            <option value={PizzaSize.SMALL}>Small</option>
          </select>
        </label>
        <br />
        <label>
          Pizza Base:
          <select
            value={base}
            onChange={(e) =>
              setBase(PizzaBase[e.target.value as keyof typeof PizzaBase])
            }
          >
            <option value={PizzaBase.THIN}>Thin</option>
            <option value={PizzaBase.THICK}>Thick</option>
          </select>
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
