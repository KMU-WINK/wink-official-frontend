import Head from "next/head";
import TopBar from "components/TopBar";
import AOS from "aos";
import styles from "@/styles/Home.module.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Content1 from "components/Content1";
import Content2 from "components/Content2";
import Footer from "components/Footer";
import Content3 from "components/Content3";
import Link from "next/link";
import active_0 from "../../public/activity_2022wink.jpg";
import active_1 from "../../public/activity_winkathon.jpg";
import active_2 from "../../public/activity_precourse.jpg";
import active_3 from "../../public/activity_weminar.png";
import active_4 from "../../public/activity_linked.jpg";

const contentList = [
  {
    subject: "윙커톤",
    title: "서로의 우정이 두터워지는\n무박 2일 해커톤 여정",
    text: "부원들과 함께 밤을 새며 새로운 서비스를 만들었어요. 지난 대회에서는 UN 지속가능 발전 목표를 주제로 총 5개의 서비스를 만들었답니다.",
    reverse: false,
    imageSrc: active_1,
    imageAlt: "WINKATHON",
  },
  {
    subject: "프리코스",
    title: "햇병아리 웹 개발자를 위한\nWINK만의 커리큘럼",
    text: "WINK 소속 개발자들이 만든 웹 기초 커리큘럼으로 재학생들과 함께 했어요.",
    reverse: true,
    imageSrc: active_2,
    imageAlt: "PRECOURSE",
  },
  {
    subject: "위미나",
    title: "현업 개발자 선배님들과 함께\n하는 유익한 세미나",
    text: "WINK 출신의 멋진 선배님들을 초청하여 다양한 주제로 세미나를 진행하고 있어요.",
    reverse: false,
    imageSrc: active_3,
    imageAlt: "WEMINAR",
  },
  {
    subject: "연계 활동",
    title: "활발한 동아리 연계 활동",
    text: "연구실 연계 활동 및 학부 연구생 활동이 활발히 진행되고 있어요. SW중심대학 관련 사업에도 다양하게 참여하고 있습니다.",
    reverse: true,
    imageSrc: active_4,
    imageAlt: "LINKED",
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
      <div className="flex flex-col items-center px-5 w-full bg-[#C8D7FF] py-[132px] md:py-[264px]">
        <Content1 />
      </div>
      <div className="bg-gradient-to-b from-[#c8d7ff] to-[#ffffff] h-[128px] md:h-[260px]" />
      <div className="px-5 flex flex-col items-center">
        <Content2
          title={"안녕하세요. 우리는 WINK입니다."}
          imageSrc={active_0}
          imageAlt={"Image 2-1"}
        />
        <div>
          <h1 className="font-pretendard font-bold text-5xl leading-[65px] py-[26px] md:py-[52px]">
            우리는 어떤 길을
            <br />
            걸어 왔을까요?
          </h1>
          <div className="flex flex-col gap-[60px] md:gap-[120px]">
            {contentList.map((content, index) => (
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
      </div>
      <Footer />
    </>
  );
}
