"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PhonelyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    console.log("PhonelyWidget will be rendered");
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsIframeLoaded(false); // Reset iframe loaded state when closing
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            size="icon"
            className="rounded-full bg-primary text-primary-foreground shadow-lg"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-transparent shadow-none overflow-auto border-none max-w-sm md:max-w-4xl p-0">
        <div className="relative rounded-xl w-full h-[70vh] max-h-[600px] shadow bg-transparent overflow-hidden">
          <AnimatePresence>
            {!isIframeLoaded && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-background"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <p>Setting up</p>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <iframe
            src={process.env.NODE_ENV === "production" ? "https://phonely.raj.how" : "http://localhost:3001"}
            allow="microphone"
            onLoad={() => setIsIframeLoaded(true)}
            className="w-full h-full"
          />
        </div>
        <div className="-bottom-full text-white/80 text-xs w-full text-center z-10">
          Powered by phonely
        </div>
      </DialogContent>
    </Dialog>
  );
}
