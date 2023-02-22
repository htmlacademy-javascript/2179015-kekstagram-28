const isLessOrEqual = (string, length) => string.length <= length;

isLessOrEqual('проверяемая строка', 20);


const isPalindrom = (string) => {
  const tempString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = tempString.split('').reverse().join('');
  return tempString === reversedString;
};

isPalindrom('Кекс');


const extractNumber = (string) => {
  const result = String(string).replace(/[^0-9]/g, '');
  return parseInt(result, 10);
};

extractNumber('2023 год');


const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  return actualPad <= 0
    ? string
    : pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('qwerty', 4, '0');
