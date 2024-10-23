"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { Toaster } from "@/components/ui/toaster";

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

// Temporarily commented
// export const metadata: Metadata = {
//   title: "Social App",
//   description: "A social media app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Provider store={reduxStore}>
            <Navbar />
            <div className="container md:mt-16 mt-2">{children}</div>
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
