//случайное целое
const getRandomNumber = (left, right) => Math.trunc(Math.random() * (right + 1 - left) + left);

//случайное неповторяющееся массив из N элементов
const getRandomArray = (array, count) => {
  const newArray = [];
  let idArray = array.slice().map((element) => element.id);

  for (let i = 0; i < count; i++) {
    const choice = getRandomNumber(0, array.length - i - 1);
    newArray.push(array[idArray[choice]]);
    idArray.splice(choice, 1);
  }

  return newArray;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getRandomArray, debounce};
