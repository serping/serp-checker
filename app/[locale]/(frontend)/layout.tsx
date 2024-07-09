import { Footer } from "@/frontend/shared/footer";
import { Header } from "@/frontend/shared/header";
import { Top } from "@/frontend/shared/top";
import type { PropsWithChildren } from "react";

export default function FrontendLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
      <Top />
    </>
  );
}
