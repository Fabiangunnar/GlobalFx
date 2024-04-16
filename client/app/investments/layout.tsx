import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Investments | GLOBAL TYCOON FX",
  description:
    "Investments GLOBAL TYCOON FX,Investments globaltycoonfx trading,Investments globaltycoonfx,Investments globaltycoonfx.com, Investments global fx, Investments fx global, tycoon fx , tycoon global, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading",
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
