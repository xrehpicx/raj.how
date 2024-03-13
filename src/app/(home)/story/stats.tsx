"use client";

import { useEffect } from "react";

export function Stats() {
  useEffect(() => {
    const handleMetadata = (event: any) => {
      const { data } = event;
      if (typeof data === "object" && data?.giscus?.discussion) {
        console.log(data);
      }
    };

    window.addEventListener("message", handleMetadata as any);

    return () => window.removeEventListener("message", handleMetadata as any);
  }, []);
  return <div></div>;
}
