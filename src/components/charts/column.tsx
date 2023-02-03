import React, { useEffect, useState } from "react";

export default function ColumnChart({
  price = 0,
  color = "",
  bestPrice = 0,
}: {
  price: number;
  color: string;
  bestPrice: number;
}) {
  const [columnLength, setColumnLength] = useState<string>("10");
  const [currentColor, setCurrentColor] = useState<string>('silver')

  useEffect(() => {
    setCurrentColor(color);
    setColumnLength(`${price * 4}px`);
  }, [price]);

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
