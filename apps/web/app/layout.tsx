import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";

import { COOKIE_NAMES } from "@/constants/cookies";
import { ThemeProvider, QueryProvider } from "@/contexts";
import { ThemeMode } from "@/contexts/ThemeContext";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Trace Finance - Transaction Management",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(COOKIE_NAMES.THEME);

  const initialTheme = themeCookie?.value as ThemeMode | undefined;
  const initialThemeClass = initialTheme === "dark" ? "dark" : "";

  return (
    <html lang="en" className={initialThemeClass}>
      <body className={poppins.variable}>
        <QueryProvider>
          <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
        </QueryProvider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
