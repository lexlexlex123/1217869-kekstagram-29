import {createPhotos, deletePhotos} from './picture.js';
import {createRandomArray, debounce} from './util.js';

const filterMenu = (allPhotos) => {
  deletePhotos();
  createPhotos(allPhotos);
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  const filterRandom = (photos) => {
    deletePhotos();
    const newAllPhotos = createRandomArray(photos, 10);
    createPhotos(newAllPhotos);
  };

  const filterDiscussed = (photos) => {
    deletePhotos();
    const compareDiscussedCount = (photo1, photo2) => photo2.comments.length - photo1.comments.length;
    const newAllPhotos = photos.slice().sort(compareDiscussedCount);
    createPhotos(newAllPhotos);
  };

  const filterDefault = (photos) => {
    deletePhotos();
    createPhotos(photos);
  };

  const elementsMenu = document.querySelectorAll('.img-filters__button');
  const chooseElementMenu = () => {
    elementsMenu.forEach((element) => {
      element.addEventListener('click', () => {
        elementsMenu.forEach((e) => {
          e.classList.remove('img-filters__button--active');
        });
        element.classList.add('img-filters__button--active');
      });

      element.addEventListener('click', debounce(() => {
        if (element.id === 'filter-random') {
          filterRandom(allPhotos);
        }

        if (element.id === 'filter-default') {
          filterDefault(allPhotos);
        }

        if (element.id === 'filter-discussed') {
          filterDiscussed(allPhotos);
        }
      }));
    });
  };
  chooseElementMenu();
};

export {filterMenu};
