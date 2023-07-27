const countAdd = (count) => {
  const countListComment = Number(document.querySelector('.comments-count').textContent);

  if (count + 5 < countListComment) {
    return count + 5;
  }

  document.querySelector('.comments-loader').classList.add('hidden');
  return countListComment;
};

const renderComments = (allPhotos) => {
  const idImg = document.querySelector('.big-picture__img img').id;
  const photo = allPhotos.filter((p) => Number(p.id) === Number(idImg))[0];
  const listComments = photo.comments;
  const countListComments = Number(document.querySelector('.comments-count').textContent);
  const socialComments = document.querySelector('.social__comments');
  const count = countAdd(socialComments.children.length);
  socialComments.innerHTML = '';

  //заголовок перед комментами
  const countTitle = document.querySelector('.social__comment-count');
  countTitle.innerHTML = `
    ${count} из <span class="comments-count">${countListComments}</span> комментариев
  `;

  for (let i = 0; i < count; i++) {
    const comment = listComments[i];
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
    socialComments.appendChild(li);
  }
};

const close = () => {
  const bigPicture = document.querySelector('.big-picture');
  if (bigPicture.classList.contains('hidden')) {
    return;
  }
  const loader = document.querySelector('.comments-loader');
  loader.removeEventListener('click', renderComments);

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

const showFullWindowImg = (allPhotos, photo) => {
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

  renderComments(allPhotos);
};

export {showFullWindowImg, renderComments};
