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
    "Explore the powerful globaltycoonfx trading platform for seamless FX trade.",
  keywords:
    "globaltycoonfx trading, globaltycoonfx, globaltycoonfx.com,global fx, fx global, tycoon fx , tycoon global, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading",
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
          {/* <ToastContainer /> */}
        </ChakraProvider>
      </Providers>
    </html>
  );
}
