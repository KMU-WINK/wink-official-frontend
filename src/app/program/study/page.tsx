'use client';

import { useEffect, useState } from 'react';

import Title from '@/app/program/_component/title';
import StudyCard from '@/app/program/study/_component/study-card';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import Page from '@/api/type/schema/page';
import Study from '@/api/type/schema/study';
import { useApi } from '@/api/useApi';

import { cn } from '@/util';

import _ from 'lodash';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export default function ProgramStudyPage() {
  const [isApi, startApi, setApi] = useApi();

  const [categories, setCategories] = useState<string[]>(['전체']);
  const [studies, setStudies] = useState<Page<Study>>();

  const [category, setCategory] = useQueryState('category', parseAsString.withDefault('전체'));
  const [query, setQuery] = useQueryState('query', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));

  useEffect(() => {
    const debounce = _.debounce(() => {
      startApi(async () => {
        const { studies } = await (category === '전체'
          ? Api.Domain.Program.Study.getStudies(0, query)
          : Api.Domain.Program.Study.getStudiesByCategory(category, 0, query));

        setStudies(studies);
      });
    }, 500);

    setApi(true);
    setPage(0).then(() => {});
    setStudies(undefined);
    debounce();

    return () => debounce.cancel();
  }, [category, query]);

  useEffect(() => {
    (async () => {
      const { studies } = await (category === '전체'
        ? Api.Domain.Program.Study.getStudies(page, query)
        : Api.Domain.Program.Study.getStudiesByCategory(category, page, query));
      setStudies((prev) => ({
        page: studies.page,
        content: [...(prev?.content || []), ...studies.content],
      }));
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const { categories } = await Api.Domain.Program.Study.getCategories();
      setCategories(['전체', ...categories]);
    })();
  }, []);

  return (
    <>
      <Title title="WINK, 우리들의 파도" subtitle="나날이 성장해 가는 우리" />

      <div className="flex flex-col sm:flex-row gap-2 w-[300px] sm:w-full sm:max-w-[900px]">
        <Input
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />

        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-6 sm:space-y-4 w-full items-center">
        {isApi ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                'w-[300px] sm:w-full sm:max-w-[900px] h-[250px] sm:h-[150px] rounded-xl',
                !isApi && 'hidden',
              )}
            />
          ))
        ) : studies && studies.content.length > 0 ? (
          studies.content.map((study) => <StudyCard key={study.id} {...study} />)
        ) : (
          <p className="text-neutral-500">검색 결과가 없습니다.</p>
        )}
      </div>

      {studies && studies.page.totalPages - 1 > page && (
        <Button variant="outline" onClick={() => setPage(page + 1)}>
          더보기
        </Button>
      )}
    </>
  );
}
