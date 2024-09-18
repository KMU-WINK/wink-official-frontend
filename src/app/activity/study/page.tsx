'use client';

import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

import { StudyCard } from '@/component';

import { EachGetCategoriesResponseDto, StudyType, WinkApi } from '@/api';

import { AnimatePresence, motion } from 'framer-motion';

const ActivityStudyPage = () => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const [studies, setStudies] = useState<StudyType[]>([]);
  const [categories, setCategories] = useState<EachGetCategoriesResponseDto[]>(
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<EachGetCategoriesResponseDto>({
      _id: 'all',
      name: 'All',
      dependencies: 0,
    });

  const filteredStudies =
    selectedCategory._id === 'all'
      ? studies
      : studies.filter(study => study.category._id === selectedCategory._id);

  useEffect(() => {
    const fetchCategories = async () => {
      const { categories } = await WinkApi.Activity.Study.getCategories();
      setCategories([
        { _id: 'all', name: 'All', dependencies: 0 },
        ...categories,
      ]);
    };

    const fetchMaxPage = async () => {
      const { page } = await WinkApi.Activity.Study.getStudiesPage();
      setMaxPage(page);
    };

    (async () => {
      await fetchCategories();
      await fetchMaxPage();
    })();
  }, []);

  useEffect(() => {
    const fetchStudies = async () => {
      const { studies } = await WinkApi.Activity.Study.getStudies({
        page,
      });
      setStudies(prev => [...prev, ...studies]);
    };

    (async () => {
      await fetchStudies();
    })();
  }, [page]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pt-32">
          <h1 className="font-bold text-4xl text-center mb-6">
            WINK, 우리들의 파도
          </h1>
          <p className="font-regular text-xl text-center text-zinc-700]">
            나날히 성장해 가는 우리
          </p>
        </div>

        {/* 주목할 글 */}
        <div className="w-study mx-auto mt-20 mb-36">
          <h2 className="font-semibold text-3xl mb-4">🔥 주목할 글</h2>
          <div className="flex flex-col items-center w-full gap-7">
            {studies
              .slice(0, 4)
              .map(({ _id, image, link, title, content, author }) => (
                <StudyCard
                  key={_id}
                  image={image}
                  link={link}
                  title={title}
                  content={content}
                  author={author}
                />
              ))}
          </div>
        </div>

        {/* 최신글 */}
        <div className="w-study mx-auto mt-12 mb-28">
          <div className="flex w-full justify-between gap-7 mb-16 relative">
            <h2 className="font-semibold text-xl">🌱 최신글</h2>
            <div className="relative w-64">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1 w-full border border-gray-400 rounded-md flex justify-between items-center bg-white"
              >
                {selectedCategory.name}
                <FaAngleDown
                  className={`w-4 h-4 ml-2 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: '10rem' }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto"
                  >
                    {categories.map(category => (
                      <div
                        key={category._id}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                      >
                        {category.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col items-center gap-7">
            {filteredStudies
              .slice(4)
              .map(({ _id, image, link, title, content, author }) => (
                <StudyCard
                  key={_id}
                  image={image}
                  link={link}
                  title={title}
                  content={content}
                  author={author}
                />
              ))}
          </div>
        </div>

        {/* 더보기 버튼 */}
        {page < maxPage && (
          <div className="flex justify-center mb-72">
            <button
              onClick={() => {
                setPage(prev => prev + 1);
              }}
              className="px-4 py-2 bg-white rounded-2xl border border-gray-400 hover:bg-gray-100  text-lg font-semibold"
            >
              더 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityStudyPage;
