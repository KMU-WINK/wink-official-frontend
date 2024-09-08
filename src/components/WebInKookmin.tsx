import React from 'react';

export const WebInKookmin: React.FC = () => {
  const colors = ['#B6CDFF', '#E7EDFE'];

  const text = [
    { text: 'W', color: colors[0] },
    { text: 'E', color: colors[1] },
    { text: 'B', color: colors[1] },
    { text: ' ', color: colors[0] },
    { text: 'I', color: colors[0] },
    { text: 'N', color: colors[0] },
    { text: ' ', color: colors[0] },
    { text: 'K', color: colors[0] },
    { text: 'O', color: colors[1] },
    { text: 'O', color: colors[1] },
    { text: 'K', color: colors[1] },
    { text: 'M', color: colors[1] },
    { text: 'I', color: colors[1] },
    { text: 'N', color: colors[1] },
  ];

  return (
    <div className="text-7xl font-bold tracking-wide select-none">
      {text.map((t, i) => (
        <span key={i} style={{ color: t.color }}>
          {t.text}
        </span>
      ))}
    </div>
  );
};
