import { Fragment } from 'react';

import { techStack } from '@/app/about-us/wink/_constant/tech_stack';

export default function TechStack() {
  return (
    <div className="flex flex-col w-[320px] sm:w-full sm:max-w-[640px]">
      <div className="border-2 border-neutral-200 rounded-md shadow-md">
        <div className="w-full h-6 bg-neutral-200 flex items-center space-x-1.5 pl-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <div className="flex flex-col space-y-5 sm:space-y-8 items-center py-8">
          {techStack.map((icons, index) => (
            <div key={index} className="flex flex-row gap-5 sm:gap-8">
              {icons.map(({ icon: Icon, color }) => (
                <Fragment key={Icon.name}>
                  <Icon size={52} color={color} className="hidden sm:block" />
                  <Icon size={36} color={color} className="sm:hidden" />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 text-center sm:text-left">
        <div className="flex flex-col text-2xl sm:text-3xl font-semibold">
          <p className="text-neutral-500">더 나은 우리를 위해서</p>
          <p>자율적인 스터디 진행</p>
        </div>

        <div>
          <p className="text-sm sm:text-base">
            기초 스터디부터 React, Spring Boot 등
            <br />
            다양한 기술 스택을 배워보며 개발 능력을 쌓아요.
            <br />
            스터디원끼리 돈독해지는 건 덤이에요.
          </p>
        </div>
      </div>
    </div>
  );
}
