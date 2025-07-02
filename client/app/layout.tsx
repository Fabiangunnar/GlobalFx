import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/redux/provider";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/sea-green";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { appname } from "@/data/maindata";
// const { ToastContainer } = createStandaloneToast();
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: appname,
  description:
    "Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade.",
  keywords:
    "global trade zella, globaltradezella, globaltradezella.com, global trade, zella trade, global zella, zella, global, trade, forex, currency exchange, online trading",
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
          <body className={poppins.className}>{children}</body>
        </ChakraProvider>
      </Providers>
    </html>
  );
}
