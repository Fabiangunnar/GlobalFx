import AdminLayout from "@/components/layout/AdminLayout";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "ADMIN | GLOBAL TRADE ZELLA",
  description:
    "ADMIN GLOBAL TRADE ZELLA,ADMIN globaltradezella trading,ADMIN globaltradezella,ADMIN globaltradezella.com, ADMIN global fx, ADMIN fx global,ADMIN trade zella , trade global, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
