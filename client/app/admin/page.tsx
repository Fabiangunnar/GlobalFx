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
          content="Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltradezella trading, globaltradezella, globaltradezella admin, admin globaltradezella, admin, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
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
