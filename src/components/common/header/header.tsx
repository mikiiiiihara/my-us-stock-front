import React, { FC } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "react-bootstrap";
import { NAVIGATION_LIST } from "../../../constants/navigation";
import SignOut from "../sign-out/signOut";

type Props = {
  userName?: string;
};

const HeaderComponent: FC<Props> = ({ userName }) => {
  return (
    <div className={styles.header}>
      {userName ? (
        <div className={styles.myAccount}>
          <p>{userName ?? ""} </p>
          <br />
          <SignOut />
        </div>
      ) : (
        <></>
      )}
      <Nav
        className={`${styles.navbar} navbar-expand-lg navbar-dark bg-dark d-none-tb`}
      >
        <div className="container-xl">
          <Link href={NAVIGATION_LIST.HOME} className="navbar-brand float-left">
            My US Stock Portfolio
          </Link>
          <ul className={`navbar-nav mr-auto float-left ${styles.subMenu}`}>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.DIVIDEND} className="nav-link">
                Dividend
              </Link>
            </li>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.ASSET} className="nav-link">
                Stock
              </Link>
            </li>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.SECTOR} className="nav-link">
                Sector
              </Link>
            </li>
          </ul>
        </div>
      </Nav>
      <div className={styles.navSp}>
        <div className={styles.navSpContent}>
          <Link href={NAVIGATION_LIST.HOME}>
            <div className={styles.navSpItem}>
              <Image
                src="/asset.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Home</p>
            </div>
          </Link>
          <Link href={NAVIGATION_LIST.DIVIDEND}>
            <div className={styles.navSpItem}>
              <Image
                src="/dividend.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Dividend</p>
            </div>
          </Link>
          <Link href={NAVIGATION_LIST.ASSET}>
            <div className={styles.navSpItem}>
              <Image
                src="/home.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Stock</p>
            </div>
          </Link>
          <Link href={NAVIGATION_LIST.SECTOR}>
            <div className={styles.navSpItem}>
              <Image
                src="/sector.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Sector</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

HeaderComponent.displayName = "Header";
export const Header = React.memo(HeaderComponent);
