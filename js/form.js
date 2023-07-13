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
  }
});

//скрытие отображение картинки по клику на крестик
const closeButton = document.querySelector('#upload-cancel');
closeButton.addEventListener('click', () => {
  close();
});

//скрытие отображения картинки по Esc
document.addEventListener('keydown', (evt) => {
  const form = document.querySelector('.img-upload__form');
  const noFocus = (form.querySelector('.text__hashtags') !== document.activeElement) && (form.querySelector('.text__description') !== document.activeElement);

  if ((evt.key === 'Escape') && (noFocus)) {
    evt.preventDefault();
    close();
  }
});

//добавляем аттрибуты форме
const addFormAttr = () => {
  const form = document.querySelector('.img-upload__form');
  form.action = 'index.html';
  form.method = 'post';
  form.enctype = 'multipart/form-data';

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'error-validate'
  });

  const validateHashTag = (value) => /^#[a-zа-яё0-9]{2,20}$/i.test(value);

  const validateHashTagBlank = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    //недопустимый хэштег
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    if (countErrorHashTag.length > 0) {
      return false;
    }
    return true;
  };

  const validateHashTagCount = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    //количество хэштегов больше 5
    if (words.length > 5) {
      return false;
    }
    return true;
  };

  const validateHashTagRepeat = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    //повторяющиеся хэштеги
    const repeatWords = new Set(words);
    if (words.length === repeatWords.size) {
      return true;
    }
    return false;
  };

  const validateComments = () => {
    const input = form.querySelector('.text__description').value;
    if (input.length > 140) {
      return false;
    }
    return true;
  };

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagBlank, 'недопустипый хэштег');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagCount, 'хэштегов больше 5');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagRepeat, 'есть повторяющиеся хэштеги');
  pristine.addValidator(form.querySelector('.text__description'), validateComments, 'комментариев больше 140');

  form.addEventListener('submit', (evt) => {
    if (pristine.validate()) {
      evt.preventDefault();
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
  });
};

addFormAttr();
loadFormImg();
