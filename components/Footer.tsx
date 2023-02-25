import Image from "next/image";
import icon_github from "../public/github.png";
import icon_instagram from "../public/instagram.png";
import icon_tistory from "../public/tistory.png";
import logo from "../public/logo.png";
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
      href: "https://www.instagram.com/kmu_wink_7_0/",
      icon: icon_instagram,
    },
    {
      id: "tistory",
      href: "https://cs-kookmin-club.tistory.com/category/WINK-%28Web%26App%29",
      icon: icon_tistory,
    },
  ];

  return (
    <div className="flex mt-10 flex-col py-16 bg-[#f3f6ff] items-center">
      <div className="flex justify-center mb-4">
        <Image src={logo} alt={"WINK small logo"} width={89} />
        <p>WINK</p>
      </div>
      <ul className="flex list-none gap-2 mb-4">
        {links.map((link) => (
          <li className="inline" key={link.id}>
            <Link href={link.href}>
              <Image className="h-10 w-10" src={link.icon} alt={link.id} />
            </Link>
          </li>
        ))}
        <li></li>
      </ul>
      <p className="text-sm font-normal">@ WINK 2023 All rights reserved.</p>
    </div>
  );
};

export default Footer;
