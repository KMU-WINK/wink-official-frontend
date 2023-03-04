import Image from "next/image";
import image1 from "../public/intro_1.jpg";
import image2 from "../public/intro_2.jpg";
import "aos/dist/aos.css";

const Content1 = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-[80px]">
      <div className="flex flex-col gap-[58px]">
        <h1
          className="font-pretendard text-4xl md:text-5xl font-medium"
          data-aos="fade-right"
        >
          무시 못할,
          <br />
          자꾸만 눈이 가는
          <br />큰 제목
        </h1>
        <Image
          data-aos="fade-up"
          className="rounded-3xl w-screen md:w-[400px]"
          src={image1}
          alt={"Image 1"}
        />
      </div>
      <div className="flex flex-col gap-[62px]">
        <Image
          data-aos="fade-left"
          className="rounded-3xl w-screen md:w-[400px]"
          src={image2}
          alt={"Image 2"}
        />
        <p
          className="font-pretendard text-xl md:text-2xl font-medium"
          data-aos="fade-right"
        >
          내용은 세 줄 정도면 좋겠어요.
          <br />
          솔직히 작은 글씨라 읽을까 싶기도 하지만,
          <br />
          아무말이나 적을 수는 없는 법이죠!
        </p>
      </div>
    </div>
  );
};

export default Content1;
