export default (num: number): string => {
  const format = (n: number) => {
    const str = String(Math.floor(n));
    return str.padStart(2, '0');
  };

  const seconds = format(num % 60);
  const minutes = format(num / 60);

  const str = `${minutes}:${seconds}`;
  return str;
};
