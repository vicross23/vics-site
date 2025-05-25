import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "~/components/navigation/navigation-bar";
import Footer from "~/components/footer/footer";
import QueryProvider from "~/components/providers/query-provider";
import { Toaster } from "~/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victoria Ross",
  description: "A curation of me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased}`}
      >
        <QueryProvider>
          <main className="flex flex-col min-h-screen w-full">
            <NavigationBar />
            <div className="grow flex flex-col">{children}</div>
          </main>
          <Toaster />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
