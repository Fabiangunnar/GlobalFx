"use client";
import "@/app/globals.scss";
import styles from "@/app/styles/Home.module.scss";
import SideNav from "@/components/pages/SideNav";
import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Header from "@/components/pages/Header";
import { usePathname, useRouter } from "next/navigation";
import {
  getAdminAccounts,
  getAllDeposits,
  getAllNotifications,
  getAllPendingDeposits,
  getMyInvestments,
  getMyTrades,
  getUser,
  setUserInfo,
} from "@/redux/features/HomeAppSlice";
import { closeNav } from "@/redux/features/NavSlice";
import { Button } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const sideNavRef: any = useRef();
  const topNavRef: any = useRef();
  const pathname = usePathname();
  const { userInfo } = useAppSelector((state) => state.HomeAppSlice);

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
    if (!userData && pathname === "/admin") {
      router.push("/admin/auth");
    }
    // if (userData && pathname === "/admin/auth") {
    //   router.push("/admin");
    // }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = storedUser ? JSON.parse(storedUser) : null;
    if (user) {
      const run = async () => {
        await dispatch(getUser(user.id));
        await dispatch(getAllDeposits(user.id));
        await dispatch(getAllNotifications(user.id));
        await dispatch(getAllPendingDeposits(user.id));
        await dispatch(getMyTrades(user.id));
        await dispatch(getMyInvestments(user.id));
        await dispatch(getAdminAccounts());
        await dispatch(setUserInfo(user));
      };
      run();
    }
  }, []);

  const { openNav } = useAppSelector((state) => state.nav);

  return (
    <div className={`app-block ${styles.app_block} sticky top-0 h-screen`}>
      {pathname === "/admin/auth" ? (
        <div className="w-screen h-screen">{children}</div>
      ) : (
        <>
          <aside
            ref={sideNavRef}
            className={` ${styles.sidenav} ${
              openNav ? styles.navbox_active : ""
            } ${styles.aside} `}
          >
            <SideNav />
          </aside>
          <section className={`${styles.navbox_section} `}>
            <header
              className={"fixed top-0 left-0 w-full z-[1000] flex flex-col"}
              ref={topNavRef}
            >
              <Header />
              {userInfo?.purchaseSignal === false && (
                <div className="fixed top-12 md:top-16 z-40 inset-x-0 w-full bg-red-300 min-h-12 flex justify-center items-center border border-red-600 text-center">
                  <Flex justify={"center"} align={"center"} gap={2}>
                    <p className="text-red-600">
                      You need to purchase a signal
                    </p>
                  </Flex>
                </div>
              )}
            </header>
            <section className="pt-14">{children}</section>
          </section>
        </>
      )}
    </div>
  );
}
