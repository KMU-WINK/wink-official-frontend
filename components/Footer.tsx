import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import icon_github from "../public/github.png";
import icon_instagram from "../public/instagram.png";
import icon_tistory from "../public/tistory.png";
import logo from "../public/logo.png";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} alt={"WINK small logo"} width={89} />
        <p>WINK</p>
      </div>
      <li className={styles.social_icons}>
        <a target="_blank" href="https://github.com/KMU-WINK" rel="noreferrer">
          <Image
            className={styles.icon}
            src={icon_github}
            alt={"WINK github"}
          />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/kmu_wink_7_0/"
          rel="noreferrer"
        >
          <Image
            className={styles.icon}
            src={icon_instagram}
            alt={"WINK instagram"}
          />
        </a>
        <a
          target="_blank"
          href="https://cs-kookmin-club.tistory.com/category/WINK-%28Web%26App%29"
          rel="noreferrer"
        >
          <Image
            className={styles.icon}
            src={icon_tistory}
            alt={"WINK tistory"}
          />
        </a>
      </li>
      <p>@ WINK 2023 All rights reserved</p>
    </div>
  );
};

export default Footer;
