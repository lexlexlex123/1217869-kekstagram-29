import {createPhoto} from './picture.js';
import {showFullWindowImg} from './full-window.js';
import {validateForm, loadFormImg, scaleImage, changeFilterEffect} from './form.js';

const response = await fetch('https://29.javascript.pages.academy/kekstagram/data', {method: 'GET'});
const getData = await response.json();

const allPhotos = getData;
createPhoto(allPhotos);
showFullWindowImg(allPhotos);
loadFormImg();
validateForm();
scaleImage();
changeFilterEffect();




