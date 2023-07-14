import {describePhotos} from './describe-photo.js';
import {createPhoto} from './picture.js';
import {showFullWindowImg} from './full-window.js';
import {validateForm, loadFormImg} from './form.js';

const allPhotos = describePhotos(25);
createPhoto(allPhotos);
showFullWindowImg(allPhotos);
loadFormImg();
validateForm();
