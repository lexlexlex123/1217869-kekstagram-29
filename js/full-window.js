const close = () => {
  const bigPicture = document.querySelector('.big-picture');
  if (bigPicture.classList.contains('hidden')) {
    return;
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    close();
  }
});

const showFullWindowImg = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  bigPicture.classList.remove('hidden');
  const bigPictureImg = document.querySelector('.big-picture__img img');
  bigPictureImg.src = photo.url;
  bigPictureImg.id = photo.id;
  const likeCount = document.querySelector('.likes-count');
  likeCount.textContent = photo.likes;
  const commentCount = document.querySelector('.comments-count');
  commentCount.textContent = photo.comments.length;
  const description = document.querySelector('.social__caption');
  description.textContent = photo.description;
  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';

  //закрываем окно счетчика и прокрутку окна body
  document.body.classList.add('modal-open');
  bigPictureClose.addEventListener('click', () => close());

  //скрытие отображение картинки по клику на пустую область
  const closeImg = document.querySelector('.big-picture');
  closeImg.addEventListener('click', (evt) => {
    if (evt.target === closeImg) {
      close();
    }
  });
};

export {showFullWindowImg};
