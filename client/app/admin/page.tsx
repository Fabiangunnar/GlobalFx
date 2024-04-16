"use client";
import Head from "next/head";
import { useAppSelector } from "@/redux/hooks";
import Dashboard from "@/components/pages/Dashboard";

type Props = {};

const Index = (props: Props) => {
  const { openNav } = useAppSelector((state) => state.nav);

  return (
    <>
      <Head>
        <title>Personal Dashboard</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, globaltycoonfx admin, admin globaltycoonfx, admin, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Index;
