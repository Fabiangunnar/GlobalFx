import React from "react";
import {footerData, footerTypes, linkTypes} from "@/data/maindata";
import Link from "next/link";
import styles from "@/styles/home/Footer.module.scss";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.footer_top}`}>
        {footerData.map((item: footerTypes) => (
          <div key={item.id} className={`${styles.footer_top_box}`}>
            <h2>{item.head}</h2>
            <ul className={`${styles.footer_top_links}`}>
              {item.links.map((subItem: linkTypes) => {
                if (subItem.link) {
                  return (
                    <li key={subItem.id}>
                      <Link href={`${subItem.link}`}>{subItem.desc}</Link>{" "}
                    </li>
                  );
                }
                return <li key={subItem.id}>{subItem.desc}</li>;
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className={`${styles.footer_line_through}`} />
      <div className={`${styles.footer_bottom}`}>
        <div>&copy; Copyright, 2023 GLOBAL TYCOON FX. All Rights Reserved</div>
        <Link href={""}>Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
