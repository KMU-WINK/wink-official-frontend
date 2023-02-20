import styles from "@/styles/Content.module.css";
import Image, { StaticImageData } from "next/image";

interface ContentProps {
  subject: string | null;
  title: string;
  text: string;
  reverse: boolean;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const Content3 = ({
  subject,
  title,
  text,
  reverse,
  imageSrc,
  imageAlt,
}: ContentProps) => {
  return (
    <div className={`${styles.content_3} ${reverse ? styles.content_3_r : ""}`}>
      <div className={subject === null ? styles.type1 : styles.type2}>
        {subject !== null ? <h2>{subject}</h2> : null}
        <h1>
          {title.split("\n").map((txt, index) => (
            <p className={styles.reset} key={index}>
              {txt}
              <br />
            </p>
          ))}
        </h1>
        <h3>
          {text.split("\n").map((txt, index) => (
            <p className={styles.reset} key={index}>
              {txt}
              <br />
            </p>
          ))}
        </h3>
      </div>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={imageAlt}
        width={400}
      />
    </div>
  );
};

export default Content3;
