import {allPhotos} from './picture.js';

window.addEventListener('load', () => {
  const pictures = document.querySelectorAll('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  console.log(pictures);

  pictures.forEach((picture) => picture.addEventListener('click', (evn) => {
    const bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = picture.querySelector('.picture__img').src;
    const likeCount = document.querySelector('.likes-count');
    likeCount.textContent = picture.querySelector('.picture__likes').textContent;
    const commentCount = document.querySelector('.comments-count');
    commentCount.textContent = picture.querySelector('.picture__comments').textContent;
    const description = document.querySelector('.social__caption');
    description.textContent = picture.querySelector('.picture__img').alt;

    bigPicture.classList.remove('hidden');
  }));

  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
});
