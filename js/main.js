import {createPhoto} from './picture.js';
import {showFullWindowImg} from './full-window.js';
import {validateForm, loadFormImg, scaleImage, changeFilterEffect, setOnFormSubmit} from './form.js';
import {getData, sendData} from './data.js';

setOnFormSubmit(async (data) => {
  await sendData(data);
});

const allPhotos = await getData();
createPhoto(allPhotos);
showFullWindowImg(allPhotos);
loadFormImg();
validateForm();
scaleImage();
changeFilterEffect();
sendData();
