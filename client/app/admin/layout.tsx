import AdminLayout from "@/components/layout/AdminLayout";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "ADMIN | GLOBAL TYCOON FX",
  description:
    "ADMIN GLOBAL TYCOON FX,ADMIN globaltycoonfx trading,ADMIN globaltycoonfx,ADMIN globaltycoonfx.com, ADMIN global fx, ADMIN fx global,ADMIN tycoon fx , tycoon global, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading",
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
