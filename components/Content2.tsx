import styles from "@/styles/Content.module.css";
import Image, { StaticImageData } from "next/image";
import "aos/dist/aos.css";

interface ContentProps {
  title: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const Content2 = ({ title, imageSrc, imageAlt }: ContentProps) => {
  return (
    <div className={styles.content}>
      <h1 data-aos="fade-right">
        {title.split("\n").map((txt) => (
          <>
            {txt}
            <br />
          </>
        ))}
      </h1>
      <Image
        className={`${styles.image} ${styles.image_shadow}`}
        data-aos="zoom-in"
        data-aos-delay="200"
        src={imageSrc}
        alt={imageAlt}
        width={878}
      />
    </div>
  );
};

export default Content2;
