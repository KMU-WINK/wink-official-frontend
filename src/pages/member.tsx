import Footer from "components/Footer";
import TopBar from "components/TopBar";
import styles from "@/styles/Member.module.css";
import Image, { StaticImageData } from "next/image";
import profile from "../../public/profile.png";

import icon_github from "../../public/github.png";
import icon_instagram from "../../public/instagram.png";
import icon_tistory from "../../public/tistory.png";

interface userInfo {
  name: string;
  role: string;
  github: string;
  instagram: string;
  blog: string;
  image: StaticImageData | undefined;
}

const Profile = ({ name, role, github, instagram, blog, image }: userInfo) => {
  return (
    <div className={styles.profileCard}>
      <Image
        className={`${styles.profileImage} mb-2`}
        src={image ? image : profile}
        alt={`${name}'s profile image`}
      />
      <div className={styles.profileInfo}>
        <h1>{name}</h1>
        <h2>{role}</h2>
        <li className={`${styles.profileWeb} p-4`}>
          <a target="_blank" href={github} rel="noreferrer">
            <Image
              className={styles.icon}
              src={icon_github}
              alt={`${name}'s github`}
            />
          </a>
          <a target="_blank" href={instagram} rel="noreferrer">
            <Image
              className={styles.icon}
              src={icon_instagram}
              alt={`${name}'s instagram`}
            />
          </a>
          <a target="_blank" href={blog} rel="noreferrer">
            <Image
              className={styles.icon}
              src={icon_tistory}
              alt={`${name}'s blog`}
            />
          </a>
        </li>
      </div>
    </div>
  );
};

export default function Member() {
  return (
    <>
      <TopBar />
      <div className={styles.profileGrid}>
        <Profile
          name={"최지원"}
          role={"21학번 프론트엔드 개발자"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={""}
          blog={""}
          image={undefined}
        />
        <Profile
          name={"장수미"}
          role={"윙크 유일무이 디자이너"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={""}
          blog={""}
          image={undefined}
        />
        <Profile
          name={"이보현"}
          role={"프론트엔드 공장장"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={""}
          blog={""}
          image={undefined}
        />
        <Profile
          name={"박정명"}
          role={"최고존엄 10대 회장"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={""}
          blog={""}
          image={undefined}
        />
        <Profile
          name={"하준혁"}
          role={"최고존엄 9대, 10대 부회장"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={""}
          blog={""}
          image={undefined}
        />
      </div>
      <Footer />
    </>
  );
}
