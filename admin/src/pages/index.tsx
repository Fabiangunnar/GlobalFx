import Head from "next/head";
import Image from "next/image";
import {Inter} from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import Page from "@/components/Page";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {closeNav} from "@/redux-actions/navSlice";
import {useRouter} from "next/router";
import {getAdmin, setAdminInfo} from "@/redux-actions/AppSlice";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {openNav} = useSelector((state: any) => state.nav);
  const dispatch = useDispatch();
  const router = useRouter();

  const sideNavRef: any = useRef();
  const topNavRef: any = useRef();

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
    const storedUser = localStorage.getItem("admin");
    let admin = storedUser ? JSON.parse(storedUser) : null;
    if (admin) dispatch(getAdmin(admin?.id));
  }, []);
  useEffect(() => {
    if (JSON.parse(`${localStorage.getItem("admin")}`) === null) {
      router.push("/auth");
    } else {
      const adminInfo = JSON.parse(`${localStorage.getItem("admin")}`);
      dispatch(setAdminInfo(adminInfo));
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Global Tycoon Fx ADMIN</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
}
