import React, { useEffect, useState } from "react";
import debounce from 'lodash.debounce'
export default function ColumnChart({
  price = 0,
  color = "",
}: {
  price: number;
  color: string;
  bestPrice: number;
}) {
  const [columnLength, setColumnLength] = useState<string>("10");
  const [currentColor, setCurrentColor] = useState<string>('');

  const debouncedColorSwitch = debounce(()=>{setCurrentColor(color)},100)

  useEffect(() => {
    setColumnLength(`${price * 4}px`);
  }, [price]);
  useEffect(()=>{
    debouncedColorSwitch()
    return ()=>debouncedColorSwitch.cancel()
  },[debouncedColorSwitch])

  return (
    <div
      style={{
        backgroundColor: currentColor,
        width: "24px",
        height: columnLength,
      }}
    ></div>
  );
}
