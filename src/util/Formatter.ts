export const formatDate = (date: string | Date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분`;
};
