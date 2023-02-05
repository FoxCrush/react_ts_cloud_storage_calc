import React, { useEffect, useState } from "react";
import debounce from 'lodash.debounce'; //@ts-ignore
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
  const [columnLength, setColumnLength] = useState<string>("10");
  const [currentColor, setCurrentColor] = useState<string>('');
  const viewSize: ISize = useWindowSize();
  const style = {
    borderRadius:'5px',
    backgroundColor: currentColor,
    width: viewSize.width > 677 ? columnLength : '24px',
    height: viewSize.width < 677 ? columnLength : '24px',
  }

  // const debouncedColorSwitch = debounce(()=>{setCurrentColor(color)},10);

  useEffect(() => {
    setColumnLength(`${price * 4}px`);
  }, [price]);
  useEffect(()=>{
    if (bestPrice === price || currentColor !== color) {
      console.log('changed', bestPrice === price && currentColor !== color)
    setCurrentColor(color)

      // debouncedColorSwitch()
    } else {
      setCurrentColor('silver')
    }
     //@ts-ignore
    // return ()=>debouncedColorSwitch.cancel()
  },[bestPrice])

  return (
    <div
      style={style}
    ></div>
  );
}
