import { PizzaSize, PizzaStatus } from "./hooks/ConsoleStateHook";

export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  } else {
    return `${seconds} sec`;
  }
}

export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

export function statusToString(status: PizzaStatus): string {
  switch (status) {
    case PizzaStatus.PLACED: {
      return "Order Placed";
    }
    case PizzaStatus.MAKING: {
      return "Order in making";
    }
    case PizzaStatus.READY: {
      return "Order Ready";
    }
    case PizzaStatus.PICKED: {
      return "Order Picked";
    }
    case PizzaStatus.CANCELLED: {
      return "Order Cancelled";
    }
    default: {
      return "NA";
    }
  }
}

export function getNextStatus(status: PizzaStatus): PizzaStatus {
  switch (status) {
    case PizzaStatus.PLACED: {
      return PizzaStatus.MAKING;
    }
    case PizzaStatus.MAKING: {
      return PizzaStatus.READY;
    }
    case PizzaStatus.READY: {
      return PizzaStatus.PICKED;
    }
    default: {
      return status;
    }
  }
}

export function getWarningTime(size: PizzaSize): number {
  switch (size) {
    case PizzaSize.SMALL: {
      return 180;
    }
    case PizzaSize.MEDIUM: {
      return 240;
    }
    case PizzaSize.LARGE: {
      return 300;
    }
    default: {
      return 180;
    }
  }
}
