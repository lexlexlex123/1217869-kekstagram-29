const choiceMessage = () => {
  const i1 = Math.trunc(Math.random() * 6);
  const i2 = Math.trunc(Math.random() * 5);
  const string = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const string1 = string[i1];
  const string2 = string.splice(i1, 1)[i2];

  const count = Math.trunc(Math.random() * 2 + 1);
  if (count === 1) {
    return string1;
  }
  if (count === 2) {
    return `${string1}'\n'${string2}`;
  }
};

const choiceName = () => {
  const choice = Math.trunc(Math.random() * 6);
  const names = ['Александр', 'Андрей', 'Ольга', 'Диана', 'Петр', 'Ксения'];
  return names[choice];
};

const identificators = [];

const choiceIdentificator = () => {
  let choice = Math.trunc(Math.random() * 1000 + 1);

  while (identificators.includes(choice)) {
    choice = Math.trunc(Math.random() * 1000 + 1);
  }
  identificators.push(choice);
  return choice;
};

//массив со всеми объектами
const descriptionPhoto = [];
for (let i = 1; i <= 25; i++) {
  const f = {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'любое описание',
    likes: Math.trunc(Math.random() * (200 - 15) + 15),
    comments: {
      id: choiceIdentificator(),
      avatar: `img/avatar-${Math.trunc(Math.random() * 6 + 1)}.svg`,
      message: choiceMessage(),
      name: choiceName()
    }
  };
  descriptionPhoto.push(f);
}
