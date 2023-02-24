import Link from "next/link";
import styles from "@/styles/TopBar.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [scrollY, setScrollY] = useState(0);
  const updateScroll = () => {
    console.log(window.scrollY);
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", updateScroll);
    }, 200);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.topbar}
        ${scrollY !== 0 ? `${styles.topbar_under}` : ""}`}
    >
      <Link href={"/"} replace>
        <Image
          className={styles.logo}
          src={logo}
          alt="Logo of WINK"
          placeholder="blur"
          width={89}
          height={25}
          priority
        />
      </Link>
      <nav className={styles.center}>
        <ul className={styles.item}>
          <li>
            <Link href={"/"}>동아리 소개</Link>
          </li>
          <li>
            <Link href={"/"}>활동 소개</Link>
          </li>
          <li>
            <Link href={"/"}>부원 소개</Link>
          </li>
          <li>
            <Link href={"/apply"}>지원하기</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
