import {createPhoto, deletePhotos} from './picture.js';
import {createRandomArray} from './util.js';

const filterMenu = (allPhotos) => {
  createPhoto(allPhotos);
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  const filterRandom = (photos) => {
    deletePhotos();
    const newAllPhotos = createRandomArray(photos, 10);
    createPhoto(newAllPhotos);
  };

  const filterDiscussed = (photos) => {
    deletePhotos();
    const compareDiscussedCount = (photo1, photo2) => photo2.likes - photo1.likes;
    createPhoto(photos.slice().sort(compareDiscussedCount));
  };

  const filterDefault = (photos) => {
    deletePhotos();
    createPhoto(photos);
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
