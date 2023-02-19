import styles from "@/styles/Content.module.css";
import Image from "next/image";
import image1 from "../public/content1_1.png";
import image2 from "../public/content1_2.png";
import "aos/dist/aos.css";

const Content1 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 data-aos="fade-right">
          무시 못할,
          <br />
          자꾸만 눈이 가는
          <br />큰 제목
        </h1>
        <Image
          data-aos="fade-up"
          className={styles.image}
          src={image1}
          alt={"Image 1"}
          width={400}
          height={670}
        />
      </div>
      <div className={styles.content}>
        <Image
          data-aos="fade-left"
          className={styles.image}
          src={image2}
          alt={"Image 2"}
          width={400}
          height={670}
        />
        <p data-aos="fade-right">
          내용은 세 줄 정도면 좋겠어요.
          <br />
          솔직히 작은 글씨라 읽을까 싶기도 하지만,
          <br />
          아무말이나 적을 수는 없는 법이죠!
        </p>
      </div>
    </div>
  );
};

export default Content1;
