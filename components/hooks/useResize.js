import { useEffect, useState } from "react";

export function useResize(wrapperRef) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  console.log("wrapperRef", wrapperRef);
  useEffect(() => {
    const element = wrapperRef.current;
    const observer = new ResizeObserver(() => {
      setSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    });
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [wrapperRef]);
  return size;
}
