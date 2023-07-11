//добавляем аттрибуты форме
const addFormAttr = () => {
  const form = document.querySelector('.img-upload__form');
  form.action = 'index.html';
  form.method = 'post';
  form.enctype = 'multipart/form-data';

  const pristine = new Pristine(form, {
    classTo: 'form__item',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'form__item',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  });

  const validateHashTag = (value) => /^#[a-zа-яё0-9]{1,25}$/i.test(value);

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTag);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

const loadFormImg = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
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
    //file.value = '';
  });
};

addFormAttr();
loadFormImg();
