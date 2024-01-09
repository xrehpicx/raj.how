import gradient from "@/app/(assets)/gradient.svg";
import symetric_gradient from "@/app/(assets)/symetric-grad.svg";
import background_gradient from "@/app/(assets)/background-gradient.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function GradientProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-fit">
      <div className="absolute rotate-180 w-[600px] -z-10 h-[800px] opacity-60 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
        <Image src={gradient} alt="gradient" />
      </div>
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
    <div className={cn("relative w-fit", className)}>
      <div
        className={cn(
          "absolute w-full -z-10 h-[800px] opacity-70 top-1/4 rotate-180 -translate-x-1/2 -translate-y-1/2 left-1/2",
          gradient_class,
        )}
      >
        <Image src={symetric_gradient} alt="gradient" />
      </div>
      {children}
    </div>
  );
}

export function BackgroundGradentProvider({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed overflow-hidden w-full h-full opacity-50 top-0 left-0",
        className,
      )}
    >
      <Image
        className="w-full h-full object-cover"
        src={background_gradient}
        alt="gradient"
      />
    </div>
  );
}
