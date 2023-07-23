const createPhoto = (allPhotos) => {
  const fragment = new DocumentFragment();

  for (const photo of allPhotos) {
    //шаблон картинки
    const picture = document.querySelector('#picture').content.cloneNode(true);

    //тэг img
    const img = picture.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;
    img.id = photo.id;

    const likeCount = picture.querySelector('.picture__likes');
    likeCount.textContent = photo.likes;

    const commentCount = picture.querySelector('.picture__comments');
    commentCount.textContent = photo.comments.length;

    fragment.append(picture);
  }

  const pictures = document.querySelector('.pictures');
  pictures.append(fragment);
};

const deletePhotos = () => {
  const pictureContainer = document.querySelector('.pictures');
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    pictureContainer.removeChild(picture);
  });
};

export {createPhoto, deletePhotos};
