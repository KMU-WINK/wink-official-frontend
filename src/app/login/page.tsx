import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import web_in_kookmin from "../../../public/web_in_kookmin.svg";

const inputFields = [
    {
        id: "email",
        type: "email",
        placeholder: "학교 이메일",
    },
    {
        id: "password",
        type: "password",
        placeholder: "비밀번호",
    },
];

export default function Login() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']); // 유저 사용 토큰

    const onClickLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // 로그인 api 처리
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen flex flex-col items-center justify-center gap-[50px]">
                <div className="text-center">
                    <Image
                        src={web_in_kookmin}
                        alt="WINK Authentication"
                        width={610}
                        height={110}
                        priority
                    />
                    <p className="mt-3.5 text-xl font-normal font-roboto">
                        국민대학교 소프트웨어융합대학 유일무이 Web 동아리
                    </p>
                </div>
                <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-[15px]">
                        {inputFields.map((field) => (
                            <InputField
                                key={field.id}
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-[5px]">
                        <Button type="submit" label="로그인" onClick={onClickLoginButton} />
                        <div className="text-center text-[11px]">
                            회원이 아니신가요?
                            <Link href="/signup" className="text-[#9DB8FF] hover:underline ml-1.5">
                                회원가입
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
