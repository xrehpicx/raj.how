"use client";

import { useEffect, useState } from "react";
import { nanoid, customAlphabet } from "nanoid";

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
      <div className="mb-2">
        <h3 className="font-display font-medium">Connect</h3>
        <p className="text-xs flex gap-1 flex-wrap italic text-foreground/80">
          reach me at{" "}
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
            <span className="w-[68px] overflow-hidden font-mono tabular-nums text-right">
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
