import React, { useEffect, useRef, useState } from "react";
import { HiOutlineBars3BottomRight, HiUser } from "react-icons/hi2";
import styles from "@/app/styles/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  WrapItem,
  Avatar,
  Divider,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TfiEmail } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import ModalPage from "./Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setOpenNav,
  setCurrentPage,
  nullAllNavStates,
} from "@/redux/features/NavSlice";
import Link from "next/link";
type Props = {};

const Header = (props: Props) => {
  const [openProfile, setopenProfile] = useState(false);
  const profileRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.HomeAppSlice);

  const handleOpenNav = () => {
    dispatch(setOpenNav());
  };
  const handleProfileClick = () => {
    setopenProfile((prev: boolean) => !prev);
  };
  const handleProfileNav = (page: string) => {
    setopenProfile((prev: boolean) => !prev);
    dispatch(setCurrentPage(page));
    dispatch(nullAllNavStates());
  };
  const handleClickOutside = (event: any) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setopenProfile(false);
    }
  };
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className={`${styles.top_nav}`} ref={profileRef}>
        <span className={`${styles.avatar}`} style={{ cursor: "pointer" }}>
          <WrapItem onClick={handleProfileClick}>
            <Avatar
              size={"sm"}
              name="Kola Tioluwani"
              src={userInfo?.picture ? userInfo.picture : "/images.png"}
            />
          </WrapItem>
          <ul
            className={`${styles.profile} ${
              openProfile ? styles.profile_active : ""
            }`}
          >
            <Link href={"/admin/profile"} className="w-full">
              <li>
                <HiUser fontSize={18} /> <span>Profile</span>
              </li>
            </Link>
            <Divider />
            <li
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              <CiLogout fontSize={18} /> <span>Logout</span>
            </li>
          </ul>
        </span>

        <span
          className={`${styles.menu_bar} ${styles.mobile}`}
          onClick={handleOpenNav}
        >
          <HiOutlineBars3BottomRight />
        </span>
      </div>
      <ModalPage isOpen={isOpen} overlay={overlay} onClose={onClose} />
    </>
  );
};

export default Header;
