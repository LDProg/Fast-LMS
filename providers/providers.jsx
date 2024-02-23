"use client";

import { Confetti } from "@/components/lms/confetti";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

export const Providers = ({ children }) => {
  const router = useRouter();

  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      <NextUIProvider navigate={router.push}>
        {children}
        <Toaster richColors />
        <Confetti />
      </NextUIProvider>
    </ThemeProvider>
  );
};
