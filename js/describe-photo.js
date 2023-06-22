import {getRandomNumber} from './util.js';
import {generateComment} from './generate-comment.js';

const getDescPhoto = (index) => {
  return {
  id: index,
  url: `photos/${index}.jpg`,
  description: 'любое описание',
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, generateComment)
  };
};

export {getDescPhoto}
