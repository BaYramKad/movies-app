export const getvoteOverage = (overage) => {
  let color = '#66E900';
  if (overage < 3) color = '#E90000';
  if (overage >= 3 && overage < 5) color = '#E97E00';
  if (overage >= 5 && overage < 7) color = '#E9D100';
  const result = `2px solid ${color}`;
  return result;
};
