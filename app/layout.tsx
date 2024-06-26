import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coachify",
  description: "Facilitating the connection between athletes and coaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className="bg-gradient-to-b from-slate-600 to-slate-950 h-screen bg-fixed">
        {children}
        <ToastContainer/>
        </body>
    </html>
  );
}
