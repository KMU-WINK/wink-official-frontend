import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";
import { useEffect, useState } from "react";

function TopBar() {
  const [scrollY, setScrollY] = useState(0);
  const updateScroll = () => {
    setScrollY(window.scrollY);
  };

  const navigations = [
    {
      title: "동아리 소개",
      href: "/",
      mobileHide: true,
    },
    {
      title: "활동 소개",
      href: "/",
      mobileHide: true,
    },
    {
      title: "부원 소개",
      href: "/",
      mobileHide: true,
    },
    {
      title: "지원하기",
      href: "/apply",
      mobileHide: false,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", updateScroll);
    }, 200);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 bg-white w-full h-14 flex items-center justify-center ${
        scrollY !== 0 && " border-b"
      }`}
    >
      <div className="w-full max-w-6xl flex justify-between p-4 lg:p-6">
        <Link href={"/"} replace>
          <Image
            className="object-contain h-6"
            src={logo}
            alt="Logo of WINK"
            placeholder="blur"
            height={24}
            priority
          />
        </Link>
        <nav className="flex justify-center items-center">
          <ul className="flex justify-center items-center list-none gap-8">
            {navigations.map((link) => (
              <li
                key={link.title}
                className={`font-bold text-sm last:text-[#3a70ff] ${
                  link.mobileHide && "hidden sm:block"
                }`}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
