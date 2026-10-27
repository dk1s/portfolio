import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SECRET_SEQUENCE = ["d", "k", "s"];
const SEQUENCE_TIMEOUT = 2000; // 2 seconds to complete sequence
const VISIBLE_DURATION = 30000; // 30 seconds visible

const SecretAdminButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const navigate = useNavigate();

  const resetSequence = useCallback(() => {
    setKeySequence([]);
  }, []);

  useEffect(() => {
    let sequenceTimer: ReturnType<typeof setTimeout>;
    let visibilityTimer: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Check if key is part of sequence
      if (SECRET_SEQUENCE.includes(key)) {
        setKeySequence((prev) => {
          const newSequence = [...prev, key];

          // Clear previous timer
          clearTimeout(sequenceTimer);

          // Check if sequence matches
          const matches = newSequence.every(
            (k, i) => k === SECRET_SEQUENCE[i]
          );

          if (!matches) {
            // Wrong sequence, reset
            return [];
          }

          if (newSequence.length === SECRET_SEQUENCE.length) {
            // Full sequence matched!
            setIsVisible(true);

            // Hide after duration
            visibilityTimer = setTimeout(() => {
              setIsVisible(false);
            }, VISIBLE_DURATION);

            return [];
          }

          // Set timeout to reset sequence if not completed
          sequenceTimer = setTimeout(resetSequence, SEQUENCE_TIMEOUT);

          return newSequence;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(sequenceTimer);
      clearTimeout(visibilityTimer);
    };
  }, [resetSequence]);

  const handleClick = () => {
    setIsVisible(false);
    navigate("/admin");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={handleClick}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow h-14 w-14 p-0"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: VISIBLE_DURATION / 1000, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-primary-foreground/50 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretAdminButton;
