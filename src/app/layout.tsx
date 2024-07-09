import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth/authContext";
import { AlertSnackbarProvider } from "@/contexts/alertSnackbarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Planner",
  description: "Money Planner",
  icons: [
    {
      href: "/favicon.ico",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertSnackbarProvider>
          <AuthProvider>{children}</AuthProvider>
        </AlertSnackbarProvider>
      </body>
    </html>
  );
}
