import React from "react";
import Stage from "./Stage";
import { PizzaStatus } from "../hooks/ConsoleStateHook";

export default function Stages() {
  return (
    <div style={{ display: "flex" }}>
      <Stage status={PizzaStatus.PLACED} />
      <Stage status={PizzaStatus.MAKING} />
      <Stage status={PizzaStatus.READY} />
      <Stage status={PizzaStatus.PICKED} />
    </div>
  );
}
