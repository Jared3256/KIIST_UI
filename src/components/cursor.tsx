import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef();
  const [pointerMode, setPointerMode] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;

    // Move the custom cursor
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // On hover of interactive elements, toggle "pointer" style
    const enterPointer = () => setPointerMode(true);
    const leavePointer = () => setPointerMode(false);

    document.addEventListener("mousemove", move);
    // delegate hover for all <a>, <button>, .clickable, etc.
    document.querySelectorAll("a, button, .clickable").forEach((el) => {
      el.addEventListener("mouseenter", enterPointer);
      el.addEventListener("mouseleave", leavePointer);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .clickable").forEach((el) => {
        el.removeEventListener("mouseenter", enterPointer);
        el.removeEventListener("mouseleave", leavePointer);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${pointerMode ? " pointer" : ""}`}
    />
  );
}
