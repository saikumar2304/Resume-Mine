import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  // Using Motion Values for Smooth Cursor Movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.querySelectorAll("a, button, input, textarea").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.querySelectorAll("a, button, input, textarea").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          width: hovered ? 50 : 20,
          height: hovered ? 50 : 20,
          backgroundColor: hovered ? "#6366F1" : "rgba(99, 102, 241, 0.6)",
          mixBlendMode: "difference",
          filter: "blur(5px)",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          opacity: hovered ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* Subtle Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          width: hovered ? 80 : 35,
          height: hovered ? 80 : 35,
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(0,0,0,0))",
          mixBlendMode: "difference",
          filter: "blur(20px)",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: hovered ? 1.2 : 1,
          opacity: hovered ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;