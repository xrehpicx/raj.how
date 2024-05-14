"use client";

import { motion } from "framer-motion";

export function CssGrain() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 10,
      }}
      className="hero pointer-events-none fixed top-0 left-0 w-full h-screen"
    ></motion.div>
  );
}
