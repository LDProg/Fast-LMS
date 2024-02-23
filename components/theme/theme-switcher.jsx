"use client";

import { useSwitch } from "@nextui-org/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { isSelected } = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      aria-label="Switch theme"
      className="px-3 mr-4 transition-opacity hover:opacity-80 cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {!isSelected ? (
        <Sun
          size={22}
          className="text-white rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 "
        />
      ) : (
        <Moon
          size={22}
          className="text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
      )}
    </Button>
  );
}
