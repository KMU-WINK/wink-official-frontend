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
          <Image className={styles.rocket} src={rocket} alt={"rocket iamge"} width={500} />
          WINK 2023-1 신입 부원 모집
        </div>
        <iframe
          width="780"
          height="940"
          src="https://docs.google.com/forms/d/e/1FAIpQLSflhDGcmQNjqHG3f65Pm-PjkkV6Jw9kleQB4vuBOus5UYLSPQ/viewform"
          allowTransparency={true}
          allowFullScreen
        />
      </div>
      <Footer />
    </>
  );
};

export default Apply;
