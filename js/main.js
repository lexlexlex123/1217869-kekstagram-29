const randomNumber = (left, right) => {
  return Math.trunc(Math.random() * (right + 1 - left) + left);
}

const choiceMessage = () => {
  const i = randomNumber(0, 5);
  const string = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  return string[i];
};

const chooseAName = () => {
  const choice = Math.trunc(Math.random() * 6);
  const names = ['Александр', 'Андрей', 'Ольга', 'Диана', 'Петр', 'Ксения'];
  return names[choice];
};

const identificators = [];

const choiceIdentificator = () => {
  let choice = randomNumber(1, 1000);

  while (identificators.includes(choice)) {
    choice = randomNumber(1, 1000);
  }
  identificators.push(choice);
  return choice;
};

//массив со всеми объектами
const descriptionPhoto = [];
const comment = () => {
  return {
  id: choiceIdentificator(),
  avatar: `img/avatar-${randomNumber(1, 6)}.svg`,
  message: choiceMessage(),
  name: chooseAName()
  }
}

for (let i = 1; i <= 25; i++) {
  const f = {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'любое описание',
    likes: randomNumber(15, 200),
    comments: Array.from({length: randomNumber(0, 30)}, i => {return comment()})
  };
  descriptionPhoto.push(f);
}

console.log(descriptionPhoto);
