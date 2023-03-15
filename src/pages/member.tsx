import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Image from "next/image";
import styles from "@/styles/Member.module.css";
import cloud from "../../public/cloud_3d.png";
import icon_profile from "../../public/profile.png";
import dataJson from "../../json/data.json";

interface userInfo {
  name: string;
  intro: string;
  github: string;
  instagram: string;
  blog: string;
  profile: boolean;
}

const Profile = ({
  name,
  intro,
  github,
  instagram,
  blog,
  profile,
}: userInfo) => {
  const websiteList = [
    [github, "GITHUB"],
    [instagram, "INSTAGRAM"],
    [blog, "BLOG"],
  ];

  return (
    <div>
      <div className="flex gap-5 w-[340px] h-[128px] p-5 border-[1.5px] border-[#9DB8FF] rounded-t-lg items-center">
        <Image
          className="rounded-full border border-gray-300 bg-[#B0C6FF]"
          width={80}
          height={80}
          src={profile ? `${github}.png` : icon_profile}
          alt={`${name}'s profile image`}
        />
        <div className="flex flex-col gap-1 justify-center">
          <h1 className="font-pretendard text-xl font-bold">{name}</h1>
          <h2 className="font-pretendard text-lg">{intro}</h2>
        </div>
      </div>
      <div className="flex w-[340px] h-[58px] pl-5 pr-7 items-center justify-between border-[1.5px] border-[#9DB8FF] rounded-b-lg border-t-0">
        {websiteList.map((info, index) => {
          return (
            <div key={index}>
              {info[0] !== "" ? (
                <a
                  className="font-roboto italic text-[#3A70FF] font-black"
                  target="_blank"
                  href={info[0].toString()}
                  rel="noreferrer"
                >
                  {info[1]}
                </a>
              ) : (
                <p className="font-roboto italic text-[#B6CDFF] font-black cursor-default">{info[1]}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Member() {
  return (
    <>
      <TopBar />
      <div className="h-16" />
      <div className="flex flex-col items-center">
        <Image
          className="animate-updown py-8"
          src={cloud}
          alt={"cloud_3d.png"}
          width={216}
        />
        <h1 className={`font-roboto font-black text-5xl lg:text-8xl text-[#D5DFFD] ${styles.text_border} tracking-wider whitespace-nowrap`}>
          NEW WAVE IN US
        </h1>
        <h2 className="font-roboto font-light italic text-lg lg:text-4xl text-[#5c80df] p-3">
          Introduction of WINK team members
        </h2>
        <div className="mt-8 mb-[124px] animate-updown-shadow h-2 bg-[#bec7e5] blur rounded-full" />
        <div />
      </div>
      <div className="grid justify-center gap-7 px-10 py-2.5 mb-[110px] grid-cols-[repeat(1,_340px)] 2xl:grid-cols-[repeat(4,_340px)] xl:grid-cols-[repeat(3,_340px)] md:grid-cols-[repeat(2,_340px)]">
        {dataJson.member.map((member, index) => (
          <Profile
            key={index}
            name={member.name}
            intro={member.intro}
            github={member.github}
            instagram={member.instagram}
            blog={member.blog}
            profile={member.profile}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
