'use client';

import React, { useEffect, useRef, useState } from 'react';

import '@/styles/Carousel.css';

interface CarouselCard {
  id: number;
  title: string;
  imageUrl: string | null;
  content: string;
  link: string;
}

interface CarouselProps {
  cards: CarouselCard[];
}

export const Carousel: React.FC<CarouselProps> = ({ cards }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [angle, setAngle] = useState(0);
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
    // 컴포넌트가 처음 렌더링될 때 첫 번째 카드 활성화
    rotateCarousel(0);
  }, [cards]);

  const rotateCarousel = (index: number) => {
    const rotateAngle = 360 / cards.length;
    setAngle((prevAngle) => {
      const newAngle = index * rotateAngle;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${-newAngle}deg)`;
      }
      return newAngle;
    });
    setCurrentIndex(index);
  };

  const handleCardClick = (index: number) => {
    rotateCarousel(index);
    if (index === currentIndex) {
      window.open(cards[index].link, '_blank');
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
                backgroundImage: card.imageUrl ? `url(${card.imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter:
                  currentIndex !== index && card.imageUrl ? 'brightness(0.5) blur(2px)' : 'none',
                boxShadow:
                  currentIndex === index && card.imageUrl ? '0 4px 8px rgba(0, 0, 0, 0.5)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* 클릭한 카드의 정보 표시 */}
      {cards.length > 0 && currentIndex !== null && (
        <div className="flex flex-col items-center pt-32 pb-12">
          <h2 className=" font-bold text-3xl mb-2">{cards[currentIndex].title}</h2>
          <p className=" font-medium text-[#737373] text-xl">{cards[currentIndex].content}</p>
        </div>
      )}

      {/* 현재 카드 위치 표시하는 점들 */}
      <ul className="flex gap-5">
        {cards.map((_, index) => (
          <li
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-[#4D4D4D]' : 'bg-[#D9D9D9]'
            } cursor-pointer`}
            onClick={() => rotateCarousel(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};
