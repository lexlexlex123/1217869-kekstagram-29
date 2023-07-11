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
    //console.log(file.files[0].name);
    //отобразим картинку
    const changeImg = document.querySelector('.img-upload__overlay');
    changeImg.classList.remove('hidden');
    //const image = document.querySelector('.img-upload__preview img');
    //image.src = file.files[0].name;

    //скрытие отображение картинки по клику на крестик
    const closeImg = document.querySelector('#upload-cancel');
    closeImg.addEventListener('click', () => {
      changeImg.classList.add('hidden');
    });

    //скрытие отображения картинки по Esc
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        changeImg.classList.add('hidden');
      }
    });

    //сбросить выбор файла в input
    file.value = '';
  });
};

addFormAttr();
loadFormImg();
