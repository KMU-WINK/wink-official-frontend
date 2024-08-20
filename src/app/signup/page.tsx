'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import web_in_kookmin from "../../../public/web_in_kookmin.svg";

type InputFieldId = "studentId" | "name" | "email" | "verificationCode" | "password" | "confirmPassword";

interface InputField {
    id: InputFieldId;
    type: string;
    placeholder: string;
    withButton?: boolean;
}

const inputFields: InputField[] = [
    {
        id: "studentId",
        type: "text",
        placeholder: "학번",
    },
    {
        id: "name",
        type: "text",
        placeholder: "이름",
    },
    {
        id: "email",
        type: "email",
        placeholder: "학교 이메일",
        withButton: true,
    },
    {
        id: "verificationCode",
        type: "text",
        placeholder: "인증번호",
    },
    {
        id: "password",
        type: "password",
        placeholder: "비밀번호",
    },
    {
        id: "confirmPassword",
        type: "password",
        placeholder: "비밀번호 재확인",
    },
];

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        email: '',
        verificationCode: '',
        password: '',
        confirmPassword: ''
    });
    const [verificationComplete, setVerificationComplete] = useState(false);
    const [showPasswordWarning, setShowPasswordWarning] = useState(false);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));

        if (id === "verificationCode" && value.length > 0) {
            setVerificationComplete(true);
            setShowPasswordWarning(false);
        }
    };

    const onClickSignUpButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // 회원가입 api 처리
        alert('회원가입 요청에 성공하셨습니다.');
        router.push('/');
    };

    const onSendVerificationCode = () => {
        // 인증번호 전송 API 처리
        alert('인증번호가 전송되었습니다.');
        setVerificationComplete(false);
    };

    const onFocusPasswordInput = () => {
        if (!verificationComplete) {
            setShowPasswordWarning(true);
        }
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen flex flex-col items-center justify-center gap-[50px]">
                <Image
                    src={web_in_kookmin}
                    alt="WINK Authentication"
                    width={610}
                    height={110}
                    priority
                />
                <div className="flex flex-col items-center justify-center gap-[10px]">
                    <p className="text-xl font-normal font-roboto">
                        국민대학교 소프트웨어융합대학 유일무이 Web 동아리
                    </p>
                    <p className="text-lg text-[#757575] font-normal font-roboto">
                        부원 확인을 위하여 회원 가입 요청 후 승인 까지 수 일이 소요될 수 있습니다.
                    </p>
                </div>
                <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-[15px]">
                        {inputFields.map((field) => (
                            <div key={field.id} className="flex flex-col gap-[3px]">
                                <div className="flex items-center gap-[10px]">
                                    <InputField
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.id]}
                                        onChange={onChangeInput}
                                        onFocus={field.id === "password" || field.id === "confirmPassword" ? onFocusPasswordInput : undefined}
                                    />
                                    {field.withButton && (
                                        <Button
                                            type="button"
                                            label="인증번호 전송"
                                            onClick={onSendVerificationCode}
                                            className="text-[13px] px-1.5 py-1"
                                        />
                                    )}
                                </div>
                                {field.id === "password" && showPasswordWarning && !verificationComplete && (
                                    <p className="text-[#666666] text-xs ml-3.5">인증을 완료해주세요.</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-[5px]">
                        <Button type="submit" label="회원 가입 요청" onClick={onClickSignUpButton} className="w-full py-2 text-[14px]"/>
                        <div className="text-center text-[11px]">
                            이미 회원이신가요?
                            <Link href="/login" className="text-[#9DB8FF] hover:underline ml-1.5">
                                로그인
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}