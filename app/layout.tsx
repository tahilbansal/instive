import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { BookDemoModal } from "@/components/site/BookDemo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Instive AI · Operational AI for supply chain",
    template: "%s · Instive AI",
  },
  description:
    "Instive AI builds intelligent systems that ride alongside your ERP, TMS and WMS, auditing every invoice, scoring every carrier, forecasting every SKU, and catching the exception before it reaches a customer.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Default to dark. Light only when the user has explicitly chosen it.
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider>{children}</ThemeProvider>
        <BookDemoModal />
      </body>
    </html>
  );
}
