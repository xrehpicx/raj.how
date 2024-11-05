"use client";

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const generate = customAlphabet("abcdefghijklmnopqrstuvwxyz", 9);

export function Connect() {
  const [random_id, setRandomEmail] = useState(generate(9));

  useEffect(() => {
    const inter = setInterval(() => {
      setRandomEmail(generate(9));
    }, 100);

    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <div className="mt-6">
      <div className="mb-2 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-medium">Connect</h3>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full flex items-center gap-1 bg-background/40 backdrop-blur-md text-foreground"
                variant="secondary"
                size="sm"
                data-cal-namespace="meet"
                data-cal-link="raj/quick-hello"
                data-cal-origin="https://cal.raj.how"
                data-cal-config='{"layout":"month_view","theme":"light"}'
              >
                <Calendar size={16} />
                Schedule
              </Button>
            </TooltipTrigger>
            <TooltipContent>Anything tech/design.</TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xs flex gap-1 flex-wrap italic text-foreground/80">
          You can also reach me at{" "}
          <a
            target="_blank"
            href="https://x.com/xrehpicx"
            className="text-primary"
          >
            @xrehpicx
          </a>{" "}
          or{" "}
          <a
            suppressHydrationWarning
            className="flex items-center text-primary justify-center"
            href={`mailto:${random_id}@raj.how`}
          >
            <span
              suppressHydrationWarning
              className="w-[68px] overflow-hidden font-mono tabular-nums text-right"
            >
              {random_id}
            </span>
            <span>@raj.how</span>
          </a>
          for any feedback or just to say hi.
        </p>
      </div>
    </div>
  );
}
