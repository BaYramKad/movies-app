export function currectStr(string) {
  if (!string) return 'Описание отсутствует';
  const arrStr = string.split(' ');
  let countRigth = 0;
  const regExp = /\W/;
  const mapStr = arrStr.map((item) => {
    item.length < 10 ? (countRigth += 1) : (countRigth -= 1);
    return item;
  });
  const limitSymbols = countRigth > 30 ? 30 : countRigth;
  const resString = mapStr.slice(0, limitSymbols);
  const lastElem = resString.length - 1;
  const lastWord = resString[lastElem].match(regExp);
  const repl = resString[lastElem].replace(regExp, '...');
  resString[resString.length - 1] = lastWord ? repl : resString[resString.length - 1] + '...';
  return resString.join(' ');
}
