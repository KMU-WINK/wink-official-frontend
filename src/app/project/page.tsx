'use client';

import { useState, useEffect } from 'react';
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

export default function Project() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [visibleProjects, setVisibleProjects] = useState(18); // 초기 18개 프로젝트 표시

    // 1. 모든 데이터를 받아오고 18개씩 잘라서 보여주기
    // const fetchProjects = async () => {
    //     try {
    //         const response = await fetch('/api/projects'); // 예시 API 엔드포인트
    //         const data = await response.json();
    //         setProjects(data); // 받아온 데이터를 상태로 설정
    //     } catch (error) {
    //         console.error('Failed to fetch projects:', error);
    //         setProjects([]);
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchProjects();
    // }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 더보기 버튼 클릭 시 호출되는 함수
    const loadMore = () => {
        setVisibleProjects(prevVisible => prevVisible + 18); // 18개씩 추가로 보여줍니다
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
                {/* 최신 프로젝트 6개 */}

                {/* 프로젝트 목록 */}
                <div className="w-full max-w-[1150px] mx-auto mt-[200px] mb-[85.6px]">
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
