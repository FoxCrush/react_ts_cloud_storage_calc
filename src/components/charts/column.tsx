import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import { useWindowSize } from "../../utility/dimensionsHook.tsx";//@ts-ignore
import {ISize} from '../../interfaces/calc-interfaces.ts'
export default function ColumnChart({
  price = 0,
  color = "",
  bestPrice = 0
}: {
  price: number;
  color: string;
  bestPrice: number;
}) {
  const defaultColor = useRef('silver');
  const [columnLength, setColumnLength] = useState<string>("10");
  const [currentColor, setCurrentColor] = useState<string>(defaultColor.current);
  const isBestPrice = useRef(false)
  const viewSize: ISize = useWindowSize();
  const style = {
    borderRadius:'5px',
    backgroundColor: currentColor,
    width: viewSize.width > 677 ? columnLength : '24px',
    height: viewSize.width < 677 ? columnLength : '24px',
  }

  useEffect(() => {
    setColumnLength(`${price * 4}px`);
  }, [price]);
  useEffect(()=>{
    if (price === bestPrice) {
      isBestPrice.current = true;
    } else {
      isBestPrice.current = false;
    }
  },[bestPrice, price])
  useEffect(()=>{
  console.log("bestPrice,price", bestPrice,price,color,isBestPrice.current)
  if (isBestPrice.current && currentColor === color) {
    setCurrentColor(color)
  }
  else if (isBestPrice.current && currentColor !== color) {
    setCurrentColor(color)
  } else {
    setCurrentColor(defaultColor.current)
  }
  },[bestPrice, color, currentColor, price])

  return (
    <div
      style={style}
    ></div>
  );
}
