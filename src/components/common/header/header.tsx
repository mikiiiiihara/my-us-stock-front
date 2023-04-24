import React, { FC, useContext } from "react";
import styles from "./header.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NAVIGATION_LIST } from "../../../constants/navigation";
import EmailContext from "../../../contexts/emailContext";

type Props = {
  title: string;
};

const Header: FC<Props> = ({ title }) => {
  const { email } = useContext(EmailContext);
  return (
    <div className={styles.header}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={styles.myAccount}>
        <p>{email} </p>
        <br />
        {/* TODO: ログアウト機能をAPI側で実装→それを叩くようにする */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => console.log("ログアウト")}
        >
          Sign out
        </Button>
      </div>
      <Nav
        className={`${styles.navbar} navbar-expand-lg navbar-dark bg-dark d-none-tb`}
      >
        <div className="container-xl">
          <Link
            href={NAVIGATION_LIST.HOME}
            className={`navbar-brand f-left ${styles.mainMenu}`}
          >
            My US Stock Portfolio
          </Link>
          <ul className={`navbar-nav mr-auto f-left ${styles.subMenu}`}>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.PORTFOLIO} className="nav-link">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.ASSET} className="nav-link">
                Asset
              </Link>
            </li>
            <li className="nav-item">
              <Link href={NAVIGATION_LIST.DIVIDEND} className="nav-link">
                Dividend
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
                src="/home.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Home</p>
            </div>
          </Link>
          <Link href={NAVIGATION_LIST.PORTFOLIO}>
            <div className={styles.navSpItem}>
              <Image
                src="/portfolio.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Portfolio</p>
            </div>
          </Link>
          <Link href={NAVIGATION_LIST.ASSET}>
            <div className={styles.navSpItem}>
              <Image
                src="/asset.png"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                alt="logo"
              />
              <p>Asset</p>
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

export default Header;
