'use client';

import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ProjectCard from '@/components/ProjectCard'; // ProjectCard 컴포넌트 가져오기

interface Project {
    id: number;
    title: string;
    imageUrl: string | null;
    tags: string[];
    year: number;
    link: string; // 추가된 필드
}

const sampleProjects: Project[] = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `Project ${index + 1}`,
    imageUrl: null, // 모든 프로젝트는 이미지 URL이 없음
    tags: [`태그${index % 3 + 1}`, `태그${index % 3 + 2}`], // 태그 예시
    year: 2020 + (index % 4), // 예시 연도
    link: 'https://example.com' // 예시 링크 (각 프로젝트의 링크로 대체)
}));

const sampleSliderProjects = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    title: `Project ${index + 1}`,
    content: '프로젝트 간단한 설명',
    link: `https://example.com` // 각 슬라이드에 링크 추가
}));

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // 중앙 정렬 모드 활성화
    centerPadding: "0px", // 중앙 슬라이드에 여백 없음
    initialSlide: 0, // 초기 중앙 슬라이드 설정
};

export default function Project() {
    const [visibleProjects, setVisibleProjects] = useState(18); // 초기 18개 프로젝트 표시
    const [currentSlide, setCurrentSlide] = useState(0); // 현재 중앙 슬라이드의 인덱스
    const sliderRef = useRef<Slider>(null); // 슬라이더 인스턴스 참조

    const loadMore = () => {
        setVisibleProjects(prevVisible => prevVisible + 18); // 18개씩 추가로 보여줍니다
    };

    const onClickSlide = (index: number) => {
        if (index === currentSlide) {
            // 현재 중앙 슬라이드를 클릭했을 때 링크를 새 탭에서 열기
            const slide = sampleSliderProjects[currentSlide];
            if (slide && slide.link) {
                window.open(slide.link, '_blank'); // 새 탭에서 링크 열기
            }
        } else {
            // 클릭된 슬라이드를 중앙으로 이동
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(index); // 클릭된 슬라이드로 이동
            }
        }
    };

    return (
        <>
            <TopBar />
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center pt-[128px]">
                    <h1 className="font-pretendard font-bold text-[40px] text-center mb-6">
                        WINK, 우리들의 파도
                    </h1>
                    <p className="font-pretendard font-regular text-[20px] text-center text-[#4D4D4D]">
                        나날히 성장해 가는 우리
                    </p>
                </div>
                {/* 슬라이더 영역 */}
                <div className="w-full max-w-[895px] mt-[129px]">
                    <Slider
                        ref={sliderRef}
                        {...settings}
                        beforeChange={(current, next) => setCurrentSlide(next)} // 슬라이드 변경 시 현재 중앙 슬라이드 업데이트
                    >
                        {sampleSliderProjects.map((project, index) => (
                            <div key={project.id} className="p-[5px] flex justify-center">
                                <div
                                    className={`bg-gray-200 h-[230px] rounded-[80px] flex items-center justify-center cursor-pointer`}
                                    onClick={() => onClickSlide(index)} // 클릭 시 처리
                                />
                                {/* 타이틀과 컨텐츠를 중앙 슬라이드에서만 보이도록 설정 */}
                                <div className={`text-center pt-5 pb-4 ${currentSlide === index ? 'block' : 'hidden'}`}>
                                    <h3 className="font-pretendard font-bold text-3xl mb-2">{project.title}</h3>
                                    <p className="font-pretendard font-medium text-[#737373] text-xl">{project.content}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                {/* 프로젝트 목록 */}
                <div className="w-full max-w-[1150px] mx-auto mt-[199.6px] mb-[85.6px]">
                    <div className="grid grid-cols-3 gap-[34px]">
                        {sampleProjects.slice(0, visibleProjects).map(project => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                imageUrl={project.imageUrl}
                                tags={project.tags}
                                year={project.year}
                                link={project.link}
                            />
                        ))}
                    </div>
                </div>
                {/* 더보기 버튼 */}
                {visibleProjects < sampleProjects.length && (
                    <div className="flex justify-center mb-10">
                        <button
                            onClick={loadMore}
                            className="px-[15px] py-2 bg-white rounded-[15px] border border-[#DADADA] hover:bg-gray-100 font-pretendard text-lg font-semibold"
                        >
                            목록 더 보기
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
