"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { ThemeProvider } from "@/components/theme-provider";
import { getQueryClient } from "@/lib/get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Analytics />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
