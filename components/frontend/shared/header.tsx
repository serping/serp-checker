
import { LocaleSwitch } from "@/components/shared/locale-switch";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { NavBar } from "./nav-bar";

export function Header() {
  return(
  <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
    <NavBar />
    <div className="flex items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <LocaleSwitch />
      <ModeToggle />
    </div>
  </header>
  )
}