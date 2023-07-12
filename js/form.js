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
    if (words.length === 0) {
      return true;
    }
    //в одном из хэштегов ошибка
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    if (countErrorHashTag > 0) {
      return false;
    }
    //количество хэштегов больше 5
    if (words.length > 5) {
      return false;
    }
    //повторяющиеся хэштеги
    const repeatWords = new Set(words);
    if (words.length === repeatWords.size) {
      return true;
    }
  };

  const validateComments = () => {
    const input = form.querySelector('.text__description').value;
    if (input.length > 140) {
      return false;
    }
    return true;
  };

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTags);
  pristine.addValidator(form.querySelector('.text__description'), validateComments);

  form.addEventListener('submit', (evt) => {
    if (pristine.validate()) {
      evt.preventDefault();
      const changeImg = document.querySelector('.img-upload__overlay');
      close();
    } else {
      evt.preventDefault();
    }
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
      close();
    });

    //скрытие отображения картинки по Esc
    const form = document.querySelector('.img-upload__form');
    document.addEventListener('keydown', (evt) => {
      const noFocus = form.querySelector('.text__hashtags') !== document.activeElement;

      if ((evt.key === 'Escape') && (noFocus)) {
        evt.preventDefault();
        close();
      }
    });
  });
};

//скрытие отображение картинки
const close = () => {
  const changeImg = document.querySelector('.img-upload__overlay');
  const file = document.querySelector('#upload-file');
  if (!changeImg.classList.contains('hidden')) {
    changeImg.classList.add('hidden');
    document.body.classList.remove('modal-open');
    file.value = '';
  }
};

//скрытие отображение картинки по клику на пустую область
const closeImg = document.querySelector('.img-upload__overlay');
closeImg.addEventListener('click', (evt) => {
  if (evt.target === closeImg) {
    close();
  };
});

addFormAttr();
loadFormImg();
