import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import Footer from "~/components/footer/footer";
import NavigationBar from "~/components/navigation/navigation-bar";
import QueryProvider from "~/components/providers/query-provider";
import { Toaster } from "~/components/ui/sonner";

import "../../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Victoria Ross",
    default: "Victoria Ross",
  },
  description: "A curation of me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased}`}>
        <QueryProvider>
          <main className="flex flex-col min-h-screen w-full">
            <Suspense fallback={null}>
              <NavigationBar />
            </Suspense>
            {children}
          </main>
          <Toaster richColors />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
