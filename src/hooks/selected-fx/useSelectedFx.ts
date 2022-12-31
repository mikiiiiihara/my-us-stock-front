import { useState } from "react";

export function useSelectedFx() {
  const [fx, setFx] = useState("$");
  const changeFx = () => {
    if (fx == "$") {
      setFx("¥");
    } else if (fx == "¥") {
      setFx("$");
    }
  };
  return {
    fx,
    changeFx,
    setFx,
  };
}
