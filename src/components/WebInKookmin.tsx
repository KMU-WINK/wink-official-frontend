import React from 'react';

export const WebInKookmin: React.FC = () => {
  const text = [
    { text: 'W', color: 'wink-200' },
    { text: 'E', color: 'wink-50' },
    { text: 'B', color: 'wink-50' },
    { text: ' ', color: 'white' },
    { text: 'I', color: 'wink-200' },
    { text: 'N', color: 'wink-200' },
    { text: ' ', color: 'white' },
    { text: 'K', color: 'wink-200' },
    { text: 'O', color: 'wink-50' },
    { text: 'O', color: 'wink-50' },
    { text: 'K', color: 'wink-50' },
    { text: 'M', color: 'wink-50' },
    { text: 'I', color: 'wink-50' },
    { text: 'N', color: 'wink-50' },
  ];

  return (
    <div className="text-7xl font-bold tracking-wide select-none">
      {text.map(({ text, color }, i) => (
        <span key={i} className={`text-${color}`}>
          {text}
        </span>
      ))}
    </div>
  );
};
