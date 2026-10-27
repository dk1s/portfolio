import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Wordmark from "@/components/Wordmark";

const ease = [0.22, 1, 0.36, 1] as const;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="w-full max-w-lg text-center">
        <div className="mb-10 flex justify-center">
          <Wordmark />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-[5rem] font-semibold leading-none tracking-tightest text-gradient-brand sm:text-[7rem]"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            This page doesn't exist
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            The link may be broken or the page may have moved. Everything worth reading is one
            click away.
          </p>

          <Button variant="brand" size="lg" asChild className="mt-8">
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
