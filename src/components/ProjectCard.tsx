import Image from 'next/image';
import logo from '../../public/logo.png';

interface ProjectCardProps {
    title: string;
    imageUrl: string | null;
    tags: string[];
    year: number;
    link: string; // 추가된 props
}

export default function ProjectCard({ title, imageUrl, tags, year, link }: ProjectCardProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#DADADA] rounded-[45px] overflow-hidden shadow-lg cursor-pointer block"
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={title}
                    width={360}
                    height={160}
                    className="object-cover w-full h-48"
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <Image
                        src={logo}
                        alt={'이미지 없음'}
                        width={100}
                        height={100}
                    />
                </div>
            )}
            <div className="p-[13.5px_27px_27px_27px]">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-[23.4px]">
                        <h2 className="font-pretendard font-bold text-lg flex-1 overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: 'calc(100% - 100px)' }}>
                            {title}
                        </h2>
                        <div
                            className="flex justify-center items-center bg-[#E8E8E8] text-center rounded-[12.6px] px-[12.6px] py-[4.5px]">
                            <h2 className="font-pretendard text-[16px] font-medium text-center">{year}년</h2>
                        </div>
                    </div>
                    <div className="text-[#696969] font-pretendard text-[12.6px] font-bold">
                        {tags.map((tag, index) => (
                            <span key={index} className="mr-1">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
}
