'use client';

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

function TopBar() {
  const [scrollY, setScrollY] = useState(0);
  const pathName = usePathname() as string;

  const updateScroll = () => {
    setScrollY(window.scrollY);
  };

  const navigations = [
    {
      title: "about us",
      href: "/#introduce",
      mobileHide: true,
      useLink: false,
    },
    {
      title: "program",
      href: "/#activity",
      mobileHide: true,
      useLink: false,
    },
    {
      title: "recruit",
      href: "/apply",
      mobileHide: false,
      useLink: true,
    },
    {
      title: "login",
      href: "/login",
      mobileHide: true,
      useLink: true,
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

  const getActiveNav = () => {
    const currentNav = navigations.find(nav => pathName.startsWith(nav.href.replace('/#', '/')));
    return currentNav ? currentNav.title : "about us";
  };

  return (
      <header
          className={`fixed top-0 z-50 bg-white w-full h-14 flex items-center justify-center ${
              scrollY !== 0 && "border-b"
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
                      className={`font-pretendard font-medium text-sm ${
                          getActiveNav() === link.title
                              ? "text-[#3a70ff]" // 활성화된 링크는 파란색
                              : "text-black" // 비활성화된 링크는 검정색
                      } ${link.mobileHide && "hidden sm:block"}`}
                  >
                    {link.useLink ? (
                        <Link href={link.href}>
                          {link.title}
                        </Link>
                    ) : (
                        <a href={link.href}>
                          {link.title}
                        </a>
                    )}
                  </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default TopBar;
