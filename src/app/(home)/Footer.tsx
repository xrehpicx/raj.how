import Clock from "@/components/clock";
import { UserIcon } from "@/components/user-icon";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border bg-background/20 backdrop-blur border-foreground/10">
      <div
        className={cn(
          "container flex justify-between items-center my-2 max-w-xl",
          className,
        )}
      >
        <div>
          <p className="text-foreground text-xs">Keep building</p>
        </div>
        <div>
      <UserIcon />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-foreground text-xs">{year}</p>
          <Clock />
        </div>
      </div>
    </footer>
  );
}
