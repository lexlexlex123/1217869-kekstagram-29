import {showFullWindowImg} from './full-window.js';
import {validateForm, loadFormImg, scaleImage, changeFilterEffect, setOnFormSubmit} from './form.js';
import {getData, sendData} from './data.js';
import {filterMenu} from './filtermenu.js';

setOnFormSubmit(async (data) => {
  await sendData(data);
});

const allPhotos = await getData();

filterMenu(allPhotos);
showFullWindowImg(allPhotos);
loadFormImg();
validateForm();
scaleImage();
changeFilterEffect();
sendData();
