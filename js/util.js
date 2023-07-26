//случайное целое
const getRandomNumber = (left, right) => Math.trunc(Math.random() * (right + 1 - left) + left);

//случайное неповторяющееся массив из N элементов
const createRandomArray = (array, count) => {
  const newArray = [];
  let oldArray = array.slice();

  for (let i = 0; i < count; i++) {
    const choice = getRandomNumber(0, array.length - i - 1);
    newArray.push(oldArray[choice]);
    oldArray = [...oldArray.slice(0, choice), ...oldArray.slice(choice + 1, oldArray.length)];
  }

  return newArray;
};

export {getRandomNumber, createRandomArray};
