import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "About | GLOBAL TRADE ZELLA",
  description:
    "about GLOBAL TRADE ZELLA,about globaltradezella trading,about globaltradezella,about globaltradezella.com, about global fx, about fx global, trade zella , trade global, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading",
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
