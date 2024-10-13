"use client";

import * as Portal from "@radix-ui/react-portal";
import { Loader2, Sparkles, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PhonelyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    console.log("PhonelyWidget will be rendered");
  }, []);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsIframeLoaded(false); // Reset iframe loaded state
  };

  return (
    <Portal.Root>
      <div className="fixed bottom-0 right-0 p-4">
        {/* Button to open the iframe */}
        {!isOpen && (
          <motion.div
            onClick={handleButtonClick}
            className="p-4 shadow cursor-pointer scale-50 bg-primary text-primary-foreground rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles />
          </motion.div>
        )}

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="fixed bottom-[920px] right-4"
            >
              <button
                onClick={handleClose}
                className="p-2 px-3 cursor-pointer bg-muted flex items-center text-muted-foreground shadow gap-2 rounded-full"
              >
                Close
                <XIcon size={12} />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        {/* Iframe Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed bottom-0 right-0 p-4 z-50"
              initial={{ opacity: 0, scale: 0.5, originX: 1, originY: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative shadow w-[400px] h-[900px] bg-transparent rounded-3xl overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Loading Indicator */}
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                      <p>Setting up</p>
                      <Loader2 className="animate-spin" size={12} />
                    </div>
                  )}
                  {/* Iframe */}
                  <iframe
                    src="https://phonely.raj.how"
                    allow="microphone"
                    onLoad={() => setIsIframeLoaded(true)}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Portal.Root>
  );
}
