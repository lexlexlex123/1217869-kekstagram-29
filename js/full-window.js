import {allPhotos} from './picture.js';

window.addEventListener('load', () => {
  const pictures = document.querySelectorAll('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');

  pictures.forEach((picture) => picture.addEventListener('click', () => {
    const bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = picture.querySelector('.picture__img').src;
    const likeCount = document.querySelector('.likes-count');
    likeCount.textContent = picture.querySelector('.picture__likes').textContent;
    const commentCount = document.querySelector('.comments-count');
    commentCount.textContent = picture.querySelector('.picture__comments').textContent;
    const description = document.querySelector('.social__caption');
    description.textContent = picture.querySelector('.picture__img').alt;

    const listComment = allPhotos.filter(({id}) => String(id) === picture.querySelector('.picture__img').id)[0].comments;
    console.log(listComment);
    const socialComment = document.querySelector('.social__comments');
    socialComment.innerHTML = '';
    listComment.forEach((comment) => {
      const li = document.createElement('li');
      li.classList.add('social__comment');
      li.innerHTML = `
      <img
          class="social__picture"
          src=${comment.avatar}
          alt=${comment.name}
          width="35" height="35">
      <p class="social__text">${comment.message}</p>
      `;
      socialComment.appendChild(li);
    });
    bigPicture.classList.remove('hidden');
  }));

  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
});
