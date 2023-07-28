import {validateForm, loadFormImg, scaleImage, changeFilterEffect, setOnFormSubmit} from './form.js';
import {getData} from './data.js';
import {filterMenu} from './filtermenu.js';

const allPhotos = await getData();
filterMenu(allPhotos);
scaleImage();
setOnFormSubmit();
loadFormImg();
validateForm();
changeFilterEffect();
