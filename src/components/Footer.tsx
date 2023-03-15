import Image from "next/image";
import icon_github from "../../public/wink_github.svg";
import icon_instagram from "../../public/wink_instagram.svg";
import icon_tistory from "../../public/wink_tistory.svg";
import logo from "../../public/wink_footer_logo.svg";
import Link from "next/link";

const Footer = () => {
  const links = [
    {
      id: "github",
      href: "https://github.com/KMU-WINK",
      icon: icon_github,
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/kmu_wink/",
      icon: icon_instagram,
    },
    {
      id: "tistory",
      href: "https://cs-kookmin-club.tistory.com/category/WINK-%28Web%26App%29",
      icon: icon_tistory,
    },
  ];

  return (
    <div className="flex flex-col py-20 bg-[#f3f6ff] items-center">
      <div className="flex gap-1 mb-[60px]">
        <Image src={logo} alt={"WINK small logo"} width={36} />
        <p className="font-roboto text-lg text-[#6B7684]">WINK</p>
      </div>
      <ul className="flex list-none gap-5 mb-10">
        {links.map((link) => (
          <li className="inline" key={link.id}>
            <Link href={link.href}>
              <Image className="h-[55px]" src={link.icon} alt={link.id} />
            </Link>
          </li>
        ))}
        <li></li>
      </ul>
      <p className="font-pretendard text-xl text-[#6B7684]">@ WINK 2023 All rights reserved.</p>
    </div>
  );
};

export default Footer;
