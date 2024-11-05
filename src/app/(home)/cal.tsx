"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";

import { useEffect } from "react";

export function CalPopup() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "meet",
        embedJsUrl: "https://cal.raj.how/embed/embed.js",
      });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#42b8ff" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="fixed hidden md:opacity-100 md:bottom-2 md:right-2 md:pointer-events-auto opacity-0 pointer-events-none z-50">
      <Button
        className="rounded-full flex items-center gap-1 bg-background/40 backdrop-blur-md text-foreground"
        data-cal-namespace="meet"
        data-cal-link="raj/meet"
        data-cal-origin="https://cal.raj.how"
        data-cal-config='{"layout":"month_view","theme":"light"}'
      >
        <Calendar size={16} />
        Schedule
      </Button>
    </div>
  );
}
