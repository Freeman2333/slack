import type { Metadata } from "next";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import localFont from "next/font/local";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "./ConvexClientProvider";
import ReactQueryProvider from "@/components/ui/react-query-provider";
import { Modals } from "@/components/modals";
import { JotaiProvider } from "@/components/jotai-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Slack",
  description:
    "A platform for businesses and professionals to connect with each other",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <NuqsAdapter>
              <ReactQueryProvider>
                <JotaiProvider>
                  <Toaster />
                  <Modals />
                  {children}
                </JotaiProvider>
              </ReactQueryProvider>
            </NuqsAdapter>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
