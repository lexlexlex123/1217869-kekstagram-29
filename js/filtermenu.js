import {createPhoto, deletePhotos} from './picture.js';
import {createRandomArray} from './util.js';
import {showFullWindowImg} from './full-window.js';

const filterMenu = (allPhotos) => {
  createPhoto(allPhotos);
  showFullWindowImg(allPhotos);
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  const filterRandom = (photos) => {
    deletePhotos();
    const newAllPhotos = createRandomArray(photos, 10);
    createPhoto(newAllPhotos);
    showFullWindowImg(newAllPhotos);
  };

  const filterDiscussed = (photos) => {
    deletePhotos();
    const compareDiscussedCount = (photo1, photo2) => photo2.likes - photo1.likes;
    const newAllPhotos = photos.slice().sort(compareDiscussedCount);
    createPhoto(newAllPhotos);
    showFullWindowImg(newAllPhotos);
  };

  const filterDefault = (photos) => {
    deletePhotos();
    createPhoto(photos);
    showFullWindowImg(photos);
  };

  const elementsMenu = document.querySelectorAll('.img-filters__button');
  const chooseElementMenu = () => {
    elementsMenu.forEach((element) => {
      element.addEventListener('click', () => {
        elementsMenu.forEach((e) => {
          e.classList.remove('img-filters__button--active');
        });
        element.classList.add('img-filters__button--active');

        if (element.id === 'filter-random') {
          filterRandom(allPhotos);
        }

        if (element.id === 'filter-default') {
          filterDefault(allPhotos);
        }

        if (element.id === 'filter-discussed') {
          filterDiscussed(allPhotos);
        }
      });
    });
  };
  chooseElementMenu();
};

export {filterMenu};
