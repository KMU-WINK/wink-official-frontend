import styles from "@/styles/Content.module.css";
import Image from "next/image";
import image1 from "../public/content2_1.png";
import "aos/dist/aos.css";

const Content2 = () => {
    return  (
        <div className={styles.content}>
            <h1 data-aos="fade-right">당연히 여긴 제목이죠!<br/>제트자로 보도록 유도해요.</h1>
            <Image className={`${styles.image} ${styles.image_shadow}`} data-aos="zoom-in" data-aos-delay="200" src={image1} alt={"Image 1"} width={878} height={417}/>
        </div>
    )
}

export default Content2;