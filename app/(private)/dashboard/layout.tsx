import type React from "react";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen  text-white">
      <header className="m-3">
        <Navbar />
      </header>

      <main className="flex flex-grow flex-wrap justify-center items-center gap-1 m-3">
        <Suspense fallback={<p>Carregando...</p>}>{children}</Suspense>
      </main>

      <footer className="m-3">
        <Footer />
      </footer>
    </div>
  );
};

export default DashboardLayout;
