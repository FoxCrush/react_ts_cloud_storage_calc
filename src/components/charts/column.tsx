import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import { useWindowSize } from "../../utility/dimensionsHook.tsx"; //@ts-ignore
import { ISize } from "../../interfaces/calc-interfaces.ts";
export default function ColumnChart({
  isBestPrice = false,
  price = 0,
  color = "",
}: {
  price: number;
  color: string;
  isBestPrice: boolean;
}) {
  const [columnLength, setColumnLength] = useState<string>("10");
  const defaultColor = useRef("silver");
  const viewSize: ISize = useWindowSize();
  const style = {
    borderRadius: "5px",
    backgroundColor: isBestPrice ? color : defaultColor.current,
    width: viewSize.width > 677 ? columnLength : "24px",
    height: viewSize.width < 677 ? columnLength : "24px",
  };

  useEffect(() => {
    setColumnLength(`${price * 4}px`);
  }, [price]);

  return <div style={style}></div>;
}
