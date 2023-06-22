const getRandomNumber = (left, right) => {
  return Math.trunc(Math.random() * (right + 1 - left) + left);
}

export {getRandomNumber};
