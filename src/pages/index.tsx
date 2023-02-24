import Head from "next/head";
import TopBar from "components/TopBar";
import AOS from "aos";
import styles from "@/styles/Home.module.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Content1 from "components/Content1";
import Content2 from "components/Content2";
import image2_1 from "../../public/content2_1.png";
import Footer from "components/Footer";
import Content3 from "components/Content3";
import Link from "next/link";

const contentList_1 = [
  {
    subject: null,
    title: "저도 잘 몰라요. 개발하면서\n알았어요. 이런걸 했었나?",
    text: "이미지 넣으면서 알았어요. 이러면서 배우는거죠. 저도 동아리 들어온지 1년 됐어요.",
    reverse: false,
    imageSrc: image2_1,
    imageAlt: "image 1",
  },
  {
    subject: null,
    title: "오, 이런 것도 했네요.\n짱이다. 너무 멋진 동아리다.",
    text: "이번에는 반대 방향으로 이미지를 보여줘요.",
    reverse: true,
    imageSrc: image2_1,
    imageAlt: "image 1",
  },
];

const contentList_2 = [
  {
    subject: "윙커톤",
    title: "저도 잘 몰라요. 개발하면서\n알았어요. 이런걸 했었나?",
    text: "이미지 넣으면서 알았어요. 이러면서 배우는거죠. 저도 동아리 들어온지 1년 됐어요.",
    reverse: false,
    imageSrc: image2_1,
    imageAlt: "image 1",
  },
  {
    subject: "모각코",
    title: "오, 이런 것도 했네요.\n짱이다. 너무 멋진 동아리다.",
    text: "이번에는 반대 방향으로 이미지를 보여줘요.",
    reverse: true,
    imageSrc: image2_1,
    imageAlt: "image 1",
  },
  {
    subject: "강연",
    title: "멋쟁이가 되는 방법",
    text: "윙크에 들어온 사람들은 멋쟁이가 돼서 나간다는 소문이 있어요.",
    reverse: false,
    imageSrc: image2_1,
    imageAlt: "image 1",
  },
];

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
          content="국민대학교 소프트웨어융합대학 웹 학술 동아리 윙크 😉"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <div className={styles.wave}>
        <p data-aos="zoom-in" data-aos-once="true">
          <span>찡긋.</span> 우리 안의 일렁임을 불태울
          <br />
          가장 나다운 방법.
        </p>
        <p data-aos="fade-up" data-aos-delay="1000">
          <Link href={"/apply"}>지원하기 {`>`}</Link>
        </p>
      </div>
      <div className={styles.content_container}>
        <div className={styles.container1}>
          <Content1 />
        </div>
        <div className={styles.container1_end}></div>
        <Content2
          title={"당연히 여긴 제목이죠!\n제트자로 보도록 유도해요."}
          imageSrc={image2_1}
          imageAlt={"Image 2-1"}
        />
        <div className={styles.container3}>
          <h1>
            우리는 어떤 길을
            <br />
            걸어 왔을까요?
          </h1>
          {contentList_1.map((content, index) => (
            <Content3
              key={index}
              subject={content.subject}
              title={content.title}
              text={content.text}
              reverse={content.reverse}
              imageSrc={content.imageSrc}
              imageAlt={content.imageAlt}
            />
          ))}
        </div>
        <div className={styles.container3}>
          <h1>
            반복.
            <br />
            강약을 주면서...
          </h1>
          {contentList_2.map((content, index) => (
            <Content3
              key={index}
              subject={content.subject}
              title={content.title}
              text={content.text}
              reverse={content.reverse}
              imageSrc={content.imageSrc}
              imageAlt={content.imageAlt}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
