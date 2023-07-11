//добавляем аттрибуты форме
const addFormAttr = () => {
  const form = document.querySelector('.img-upload__form');
  form.action = 'index.html';
  form.method = 'post';
  form.enctype = 'multipart/form-data';
};

const loadFormImg = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
    console.log(file.value);
    file.value = '';
  });
};

addFormAttr();
loadFormImg();
