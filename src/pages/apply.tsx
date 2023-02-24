import { NextPage } from "next";
import styles from "@/styles/Apply.module.css";
import TopBar from "components/TopBar";
import Footer from "components/Footer";
import Image from "next/image";
import rocket from "../../public/rocket.png";

const Apply: NextPage = () => {
  return (
    <>
      <TopBar />
      <div className={styles.sheetForm}>
        <div className={styles.background}>
          <Image
            className={styles.rocket}
            src={rocket}
            alt={"rocket iamge"}
            width={500}
          />
          <div className={styles.text}>
            <h1>
              <span>Web IN Koomin</span>
              <br />
              신입 부원 모집
            </h1>
            <h2>🚀 윙크에서 우주까지 함께 할 동료를 모집합니다!</h2>
          </div>
        </div>
        <div className={styles.container}>
          <iframe
            width="780"
            height="940"
            src="https://docs.google.com/forms/d/e/1FAIpQLSflhDGcmQNjqHG3f65Pm-PjkkV6Jw9kleQB4vuBOus5UYLSPQ/viewform"
            allowTransparency={true}
            allowFullScreen
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apply;
