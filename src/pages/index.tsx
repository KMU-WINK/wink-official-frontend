import Head from "next/head";
import TopBar from "components/TopBar";
import AOS from "aos";
import styles from "@/styles/Home.module.css";
import "aos/dist/aos.css";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <>
      <Head>
        <title>WINK: Web IN Kookmin</title>
        <meta
          name="description"
          content="국민대학교 소프트웨어융합대학 웹 학술 동아리 윙크😉"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <div className={styles.wave}>
        <p
          data-aos="zoom-in"
          data-aos-once="true"
        >
          <span>찡긋.</span> 우리 안의 일렁임을 불태울
          <br />
          가장 나다운 방법.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="1000"
        >지원하기 {`>`}</p>
      </div>
    </>
  );
}
