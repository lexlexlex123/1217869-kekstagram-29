import {validateForm, loadFormImg, scaleImage, changeFilterEffect, setOnFormSubmit} from './form.js';
import {getData} from './data.js';
import {filterMenu} from './filtermenu.js';

getData().then((allPhotos) => filterMenu(allPhotos));
scaleImage();
setOnFormSubmit();
loadFormImg();
validateForm();
changeFilterEffect();
