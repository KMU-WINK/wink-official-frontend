import Footer from "components/Footer";
import TopBar from "components/TopBar";
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
  const websiteList = [
    [github, icon_github],
    [instagram, icon_instagram],
    [blog, icon_tistory],
  ];

  return (
    <div className="flex flex-col items-center py-10 border border-[#808080] rounded-2xl">
      <Image
        className="w-32 h-32 rounded-full border border-gray-400 mb-2"
        src={image ? image : profile}
        alt={`${name}'s profile image`}
      />
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-extrabold">{name}</h1>
        <h2>{role}</h2>
        <li className="flex gap-2.5 p-4">
          {websiteList.map((info, index) => {
            if (info[0] !== "") {
              return (
                <a
                  key={index}
                  target="_blank"
                  href={info[0].toString()}
                  rel="noreferrer"
                >
                  <Image
                    className="w-8 h-8"
                    src={info[1]}
                    alt={`${name}'s github`}
                  />
                </a>
              );
            }
          })}
        </li>
      </div>
    </div>
  );
};

export default function Member() {
  return (
    <>
      <TopBar />
      <div className="grid justify-center gap-5 px-10 py-2.5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <Profile
          name={"최지원"}
          role={"21학번 프론트엔드 개발자"}
          github={"https://github.com/Choi-Jiwon-38"}
          instagram={"https://www.instagram.com/aid_choi/"}
          blog={"https://what-time.tistory.com/"}
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
