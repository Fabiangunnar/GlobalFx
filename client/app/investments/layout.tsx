import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Investments | GLOBAL TRADE ZELLA",
  description:
    "Investments GLOBAL TRADE ZELLA,Investments globaltradezella trading,Investments globaltradezella,Investments globaltradezella.com, Investments global fx, Investments fx global, trade zella , trade global, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <section className={poppins.className}>{children}</section>
    </html>
  );
}
