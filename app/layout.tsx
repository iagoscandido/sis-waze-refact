import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Plataforma de monitoramento",
  description:
    "Plataforma de monitoramento de rotas e irregularidade no trânsito com a fonte de dados do Waze Partner",
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/waze-brands-solid-full.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
