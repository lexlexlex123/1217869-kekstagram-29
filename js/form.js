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

  const validateHashTag = (value) => /^#[a-zа-яё0-9]{2,20}$/i.test(value);

  const validateHashTags = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    //пустой хэштег
    if (words.length === 0) return true;
    //в одном из хэштегов ошибка
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    if (countErrorHashTag > 0) return false
    //количество хэштегов больше 5
    if (words.length > 5) return false;
    //повторяющиеся хэштеги
    const repeatWords = new Set(words);
    if (words.length === repeatWords.size) return true;
  };

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTags);

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
    document.body.classList.add('modal-open');

    const image = document.querySelector('.img-upload__preview img');
    image.src = URL.createObjectURL(file.files[0]);
    const effectImgs = document.querySelectorAll('.effects__preview');
    effectImgs.forEach((img) => {
      img.style.backgroundImage = `url(${image.src})`;
    });

    //скрытие отображение картинки по клику на крестик
    const closeImg = document.querySelector('#upload-cancel');
    closeImg.addEventListener('click', () => {
      changeImg.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });

    //скрытие отображения картинки по Esc
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        changeImg.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });

    //сбросить выбор файла в input
    //file.value = '';
  });
};

addFormAttr();
loadFormImg();
