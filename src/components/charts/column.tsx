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

  useEffect(() => {
    setColumnLength(`${price * 4}px`);
  }, [price]);
  useEffect(() => {}, [columnLength]);

  return (
    <div
      style={{
        backgroundColor: color,
        display: "block",
        width: columnLength,
        height: columnLength,
      }}
    >
      {price}
    </div>
  );
}
