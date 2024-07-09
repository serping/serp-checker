
"use client"

import { LocaleSwitch } from "@/components/shared/locale-switch";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { NavBar } from "./nav-bar";

export function Header() {
  const [isTop, setIsTop] = useState(true);
  const debouncedScroll = useDebounceCallback(
    () => {
      setIsTop(window.scrollY < 20);
    },
    150,
    {
      maxWait: 150,
    },
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll);
    debouncedScroll();
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  return(
  <header className={cn("fixed left-0 top-0 w-full items-center gap-4 border-b bg-background px-4 md:px-6 z-50 h-16 transition-all duration-200 opacity-100", isTop ? "shadow-none flex" : "shadow-sm hidden opacity-0")}>
    <NavBar />
    <div className="flex items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <LocaleSwitch />
      <ModeToggle />
    </div>
  </header>
  )
}