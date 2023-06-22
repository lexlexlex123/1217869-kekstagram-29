import {getDescPhoto} from './describe-photo.js';

//массив со всеми объектами
const describePhotos = (count) => {
  return Array(count).fill(null).map((_, index) => getDescPhoto(index));
}

describePhotos(25);
