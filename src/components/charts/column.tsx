import React, { useEffect, useState } from "react";

export default function ColumnChart({
  finalPrice = 0,
}: {
  finalPrice: number;
}) {
  console.log("finalPrice", finalPrice);
  const [columnLength, setColumnLength] = useState<string>("10");
  useEffect(() => {
    setColumnLength(`${finalPrice}px`);
  }, [finalPrice]);
  useEffect(() => {
    console.log("columnLength", columnLength);
  }, [columnLength]);
  return (
    <div
      style={{
        width: columnLength,
        height: columnLength,
        backgroundColor: "silver",
      }}
    >
      {finalPrice}
    </div>
  );
}
