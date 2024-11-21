const text = [
  { text: 'W', color: 'text-wink-200' },
  { text: 'E', color: 'text-wink-50' },
  { text: 'B', color: 'text-wink-50' },
  { text: ' ', color: 'text-white' },
  { text: 'I', color: 'text-wink-200' },
  { text: 'N', color: 'text-wink-200' },
  { text: ' ', color: 'text-white' },
  { text: 'K', color: 'text-wink-200' },
  { text: 'O', color: 'text-wink-50' },
  { text: 'O', color: 'text-wink-50' },
  { text: 'K', color: 'text-wink-50' },
  { text: 'M', color: 'text-wink-50' },
  { text: 'I', color: 'text-wink-50' },
  { text: 'N', color: 'text-wink-50' },
];

export default function WebInKookmin() {
  return (
    <div className="text-6xl sm:text-7xl text-center font-bold">
      {text.map(({ text, color }, i) => (
        <span key={i} className={color}>
          {text}
        </span>
      ))}
    </div>
  );
}
