import { NextPage } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import rocket from "../../public/rocket.png";
import arrow from "../../public/arrow.svg";
import useMoveScroll from "@/util/useMoveScroll";
import title from "../../public/recruitment_title.png";

const Apply: NextPage = () => {
  const { element, onMoveToElement } = useMoveScroll();
  return (
    <>
      <TopBar />
      <div className="flex flex-col align-center">
        <div className="flex flex-col items-center justify-around w-full h-screen bg-[#000000] bg-[url('../../public/apply_bottom.png')] bg-no-repeat bg-left-bottom">
          <Image
            data-aos="fade-up-right"
            data-aos-once="true"
            className="w-[98px] lg:w-[136px] pt-6"
            src={rocket}
            alt={"rocket iamge"}
            width={500}
          />
          <Image className="pb-[82px]" src={title} alt={"2024 WINK RECRUITMENT"} />
          <div/>
          <Image
            className="absolute bottom-1 lg:bottom-7 animate-bounce h-12 cursor-pointer"
            onClick={onMoveToElement}
            src={arrow}
            alt={"scroll button"}
          />
        </div>
        <div className="h-[80px] bg-[#f4f7ff]" ref={element} />
        <div className="relative w-full">
          <iframe
            className="relative top-0 left-0 w-full h-[800px] bg-[#f4f7ff] border-b border-[#e4e4e4]"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdWLGyNmKexha3Z8LLS7Brx_1fvtTQxqr-Ced3WoIoCm0fAOw/viewform?embedded=true"
            allowFullScreen
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apply;
