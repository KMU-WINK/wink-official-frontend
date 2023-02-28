import { NextPage } from "next";
import TopBar from "components/TopBar";
import Footer from "components/Footer";
import Image from "next/image";
import rocket from "../../public/rocket.png";
import arrow from "../../public/arrow.svg";
import cloud from "../../public/cloud.png";
import useMoveScroll from "@/util/useMoveScroll";

const Apply: NextPage = () => {
  const {element, onMoveToElement} = useMoveScroll()
  return (
    <>
      <TopBar />
      <div className="flex flex-col align-center">
        <div className="flex flex-col justify-center items-center w-full h-screen bg-[#c8d7ff]">
          <Image
            className="z-0 absolute top-16 right-10 w-4/12"
            src={rocket}
            alt={"rocket iamge"}
            width={500}
          />
          <div className="z-10 px-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold">
              <span className="text-[#3a70ff]">WINK</span> 신입 부원 모집
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl mt-1 lg:mt-4">
              🚀 윙크에서 우주까지 함께 할 동료를 모집합니다!
            </h2>
          </div>
          <div className="absolute bottom-0">
            <Image src={cloud} alt="cloud" />
            <div className="bg-white h-[200px] lg:h-0" />
            <div className="flex justify-center">
              <Image
                className="absolute bottom-1 lg:bottom-7 animate-bounce h-12 cursor-pointer"
                onClick={onMoveToElement}
                src={arrow}
                alt={"scroll button"}
              />
            </div>
          </div>
        </div>
        <div ref={element} className="relative w-full my-10 h-[940px] pb-[56.25%]">
          <iframe
            className="absolute mt-[92px] top-0 left-0 w-[calc(100%-80px)] bg-[#f4f7ff] border border-[#e4e4e4] rounded-2xl mx-10"
            width="780"
            height="940"
            src=""
            allowFullScreen
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apply;
