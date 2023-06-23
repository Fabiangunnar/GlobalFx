import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import SideNav from "@/components/pages/SideNav";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {closeNav} from "@/redux-actions/navSlice";
import Page from "@/components/pages/Page";
import Header from "@/components/pages/Header";
import {useRouter} from "next/router";
import {
  getAdminAccounts,
  getAllDeposits,
  getAllNotifications,
  getAllPendingDeposits,
  getMyInvestments,
  getMyTrades,
  getUser,
  setUserInfo,
} from "@/redux-actions/HomeAppSlice";
type Props = {};

const Index = (props: Props) => {
  const {openNav} = useSelector((state: any) => state.nav);
  const dispatch = useDispatch();
  const sideNavRef: any = useRef();
  const topNavRef: any = useRef();
  const router = useRouter();
  const handleClickOutside = (event: any) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !topNavRef.current.contains(event.target)
    ) {
      dispatch(closeNav());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userData = storedUser ? JSON.parse(storedUser) : null;
    if (!userData && router.pathname === "/admin") {
      router.push("/admin/auth");
    }
    if (userData && router.pathname === "/admin/auth") {
      router.push("/admin");
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = storedUser ? JSON.parse(storedUser) : null;
    if (user) {
      const run = async () => {
        await dispatch(setUserInfo(user));
        await dispatch(getUser(user?.id));
        await dispatch(getAllNotifications(user?.id));
        await dispatch(getAllPendingDeposits(user?.id));
        await dispatch(getMyTrades(user?.id));
        await dispatch(getMyInvestments(user?.id));
        dispatch(getAllDeposits(user?.id));
      };
      run();
    }
  });
  useEffect(() => {
    dispatch(getAdminAccounts());
    // dispatch(reset());
  }, [dispatch]);
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
      <div className={`app-block ${styles.app_block}`}>
        <aside
          ref={sideNavRef}
          className={` ${styles.sidenav} ${
            openNav ? styles.navbox_active : ""
          }`}
        >
          <SideNav />
        </aside>
        <section className={`${styles.navbox_section} `}>
          <header ref={topNavRef}>
            <Header />
          </header>
          <main>
            <Page />
          </main>
        </section>
      </div>
    </>
  );
};

export default Index;
