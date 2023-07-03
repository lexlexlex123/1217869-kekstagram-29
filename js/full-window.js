import {allPhotos} from './picture.js';

window.addEventListener('load', () => {
  const pictures = document.querySelectorAll('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  console.log(pictures);

  pictures.forEach((picture) => picture.addEventListener('click', (evn) => {
    const bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = picture.querySelector('.picture__img').src;

    bigPicture.classList.remove('hidden');
  }));

  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
});
