import { NextPage } from "next";
import TopBar from "components/TopBar";
import Footer from "components/Footer";
import Image from "next/image";
import rocket from "../../public/rocket.png";

const Apply: NextPage = () => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col align-center">
        <div
          className="flex justify-center items-center w-full h-[50vw] bg-[#c8d7ff] bg-bottom bg-contain bg-no-repeat bg-[url('../../public/cloud.png')]"
        >
          <Image
            className="z-0 absolute top-16 right-10 w-4/12"
            src={rocket}
            alt={"rocket iamge"}
            width={500}
          />
          <div className="z-10">
            <h1 className="text-[48px] font-extrabold">
              <span className="text-[#3a70ff]">Web IN Koomin</span>
              <br />
              신입 부원 모집
            </h1>
            <h2 className="text-2xl mt-6">🚀 윙크에서 우주까지 함께 할 동료를 모집합니다!</h2>
          </div>
        </div>
        <div className="relative w-full h-[940px] pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-[calc(100%-80px)] bg-[#f4f7ff] border border-[#e4e4e4] rounded-2xl mx-10" 
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
