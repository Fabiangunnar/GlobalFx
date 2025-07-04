import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/redux/provider";
import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import MainLayout from "../components/layout/Mainlayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "GLOBAL TRADE ZELLA",
  description:
    "Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <ChakraProvider
        // toastOptions={{ defaultOptions: { position: "top-right" } }}
        >
          <body className={poppins.className}>
            <MainLayout>{children}</MainLayout>
          </body>
          {/* <ToastContainer /> */}
        </ChakraProvider>
      </Providers>
    </html>
  );
}
