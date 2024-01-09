"use client";
import gradient from "@/app/(assets)/gradient.svg";
import symetric_gradient from "@/app/(assets)/symetric-grad.svg";
import background_gradient from "@/app/(assets)/background-gradient.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

export function GradientProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-fit">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute rotate-180 -z-[5] w-[600px] h-[800px] opacity-60 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2"
      >
        <Image src={gradient} alt="gradient" />
      </motion.div>
      {children}
    </div>
  );
}

export function SymetricGradProvider({
  children,
  className,
  gradient_class,
}: {
  children: React.ReactNode;
  className?: string;
  gradient_class?: string;
}) {
  return (
    <motion.div className={cn("relative w-fit", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "absolute w-full -z-10 h-[800px] opacity-70 top-1/4 rotate-180 -translate-x-1/2 -translate-y-1/2 left-1/2",
          gradient_class,
        )}
      >
        <Image src={symetric_gradient} alt="gradient" />
      </motion.div>
      {children}
    </motion.div>
  );
}

export function BackgroundGradentProvider({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "fixed overflow-hidden w-full h-full opacity-20 top-0 left-0",
        className,
      )}
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image
          className="w-full h-full object-cover"
          src={background_gradient}
          alt="gradient"
        />
      </motion.div>
    </motion.div>
  );
}
