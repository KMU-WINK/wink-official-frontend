'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import '@/style/Carousel.css';

import * as cheerio from 'cheerio';

export interface CarouselCard {
  id: string;
  title: string;
  image: string;
  content: string;
}

interface CarouselProps {
  cards: CarouselCard[];
}

export const Carousel: React.FC<CarouselProps> = ({ cards }: CarouselProps) => {
  const router = useRouter();

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const rotateAngle = 360 / cards.length;
    const colTz = 280;

    if (carousel) {
      cards.forEach((_, idx) => {
        const card = carousel.children[idx] as HTMLElement;
        card.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px)`;
      });
    }

    rotateCarousel(0);
  }, [cards]);

  const rotateCarousel = (index: number) => {
    const rotateAngle = 360 / cards.length;
    const newAngle = index * rotateAngle;

    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${-newAngle}deg)`;
    }

    setCurrentIndex(index);
  };

  const handleCardClick = (index: number) => {
    rotateCarousel(index);
    if (index === currentIndex) {
      router.push(`/activity/project/${cards[index].id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="scene">
        <div className="carousel" ref={carouselRef}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`carousel-card ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: currentIndex !== index && card.image ? 'brightness(0.5) blur(2px)' : 'none',
                boxShadow:
                  currentIndex === index && card.image ? '0 4px 8px rgba(0, 0, 0, 0.5)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* 클릭한 카드의 정보 표시 */}
      {cards.length > 0 && currentIndex !== null && (
        <div className="flex flex-col items-center pt-32 pb-12">
          <h2 className="font-bold text-3xl mb-2">{cards[currentIndex].title}</h2>
          <p className="font-medium text-slate-500 text-xl max-w-md truncate">
            {cheerio.load(cards[currentIndex].content).root().text()}
          </p>
        </div>
      )}

      {/* 현재 카드 위치 표시하는 점들 */}
      <ul className="flex gap-5">
        {cards.map((_, index) => (
          <li
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'
            } cursor-pointer`}
            onClick={() => rotateCarousel(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};
