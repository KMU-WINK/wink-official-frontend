import Head from "next/head";
import TopBar from "@/components/TopBar";
import AOS from "aos";
import styles from "@/styles/Home.module.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Content1 from "@/components/Content1";
import Content2 from "@/components/Content2";
import Footer from "@/components/Footer";
import Content3 from "@/components/Content3";
import Link from "next/link";
import intro_1 from "../../public/intro_1.jpg";
import intro_2 from "../../public/intro_2.jpg";
import active_0 from "../../public/activity_2022wink.jpg";
import active_1 from "../../public/activity_winkathon.jpg";
import active_2 from "../../public/activity_precourse.jpg";
import active_3 from "../../public/activity_weminar.png";
import active_4 from "../../public/activity_linked.jpg";
import active_5 from "../../public/activity_study.jpeg";
import Image from "next/image";

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
    title: "동아리 대표가 되어볼까요?\n활발한 동아리 연계 활동",
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
        <meta property="og:image" content="/ogImage.png"></meta>
        <meta
          name="og:description"
          content="국민대학교 소프트웨어융합대학 웹 학술 동아리 윙크 😉"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <div className={styles.wave}>
        <h1
          className="font-pretendard z-10 text-center font-bold text-3xl md:text-[53px] md:leading-[63.25px]"
          data-aos="zoom-in"
          data-aos-once="true"
        >
          <span className="font-medium text-2xl md:text-[47px] mb- md:mb-8">
            나만의 서비스. 기획. 개발
          </span>
          <br />
          우리 안의 새로운 물결 WINK
        </h1>
        <p
          className="font-pretendard font-bold text-base md:text-xl text-[#3a70ff] z-10 "
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <Link href={"/apply"}>지원하기 {`>`}</Link>
        </p>
      </div>
      <div
        id="introduce"
        className="flex flex-col items-center px-5 w-full bg-[#C8D7FF] py-[132px] md:py-[264px]"
      >
        <Content1
          text1={"자꾸만 눈이 가는\n멋진 모습"}
          text2={
            "국민대학교 소프트웨어융합대학의\n유일무이 웹 학술 동아리.\n친목부터 대외활동까지 한 번에 챙겨요."
          }
          imageSrc1={intro_1}
          imageSrc2={intro_2}
        />
      </div>
      <div className="bg-gradient-to-b from-[#c8d7ff] to-[#ffffff] h-[128px] md:h-[260px]" />
      <div className="px-5 flex flex-col items-center">
        <Content2
          title={"안녕하세요. 우리는 WINK입니다."}
          imageSrc={active_0}
          imageAlt={"Image 2-1"}
        />
        <div>
          <h1
            id="activity"
            className="font-pretendard font-bold text-4xl md:text-5xl leading-[52px] md:leading-[65px] py-[26px] md:py-[52px]"
          >
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
        <div className="mt-[192px] md:mt-[386px] mb-[138px] md:mb-[276px]">
          <Image className="w-screen md:w-[900px]" src={active_5} alt="STUDY" />
          <div className="flex flex-col md:flex-row gap-4 justify-between py-[28px] mb:py-[56px]">
            <p className="font-pretendard font-bold text-3xl md:text-4xl">
              <span className="text-[#6B7684]">더 나은 우리를 위해서</span>
              <br />
              자율적인 스터디 진행
            </p>
            <p className="font-pretendard font-medium text-base md:text-xl">
              기초 스터디부터 React, Django, Express 등
              <br />
              다양한 기술 스택을 배워보며 개발 능력을 쌓아요.
              <br />
              스터디원끼리 돈독해지는 건 덤이에요.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
