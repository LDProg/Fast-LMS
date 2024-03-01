import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";

const inter = Quicksand({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Fast LMS",
  description:
    "Un LMS simple et rapide pour les formateurs et leurs apprenants",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="fr" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans bg-background`}>
        <SessionProvider session={session}>
          <Providers>
            {children}
            <SpeedInsights />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
