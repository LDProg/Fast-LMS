import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fast LMS",
  description: "Un LMS simple et rapide pour les formateurs et les apprenants",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="fr" suppressHydrationWarning className="bg-background">
      <body className={inter.className && "bg-background"}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
