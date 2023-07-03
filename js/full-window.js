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

    //комментарии пользователей
    let count = 0;
    const countAdd = () => {
      const countListComment = Number(document.querySelector('.comments-count').textContent);

      if (count + 5 < countListComment) {
        return count += 5;
      }
      else {
        document.querySelector('.comments-loader').classList.add('hidden');
        return countListComment;
      };
    };

    let renderComment = () => {
      const listComment = allPhotos.filter(({id}) => String(id) === picture.querySelector('.picture__img').id)[0].comments;
      const countListComment = Number(document.querySelector('.comments-count').textContent);
      const socialComment = document.querySelector('.social__comments');
      socialComment.innerHTML = '';

      const count = countAdd();

      //заголовок перед комментами
      const countTitle = document.querySelector('.social__comment-count');
      countTitle.innerHTML = `
        ${count} из <span class="comments-count">${countListComment}</span> комментариев
      `;

      for (let i = 0; i < count; i++) {
        const comment = listComment[i];
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
      };
    };

    renderComment();
    const loader = document.querySelector('.comments-loader');
    loader.addEventListener('click', () => {
      renderComment();
    });

    bigPicture.classList.remove('hidden');

    //закрываем окно счетчика и прокрутку окна body
    // document.querySelector('.social__comment-count').classList.add('hidden');
    // document.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');
  }));

  const close = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.querySelector('.comments-loader').classList.remove('hidden');
  };

  bigPictureClose.addEventListener('click', () => close());

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  });
});
