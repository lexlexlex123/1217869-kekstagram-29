import {sendData} from './data.js';

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'error-validate'
});

const close = () => {
  const changeImg = document.querySelector('.img-upload__overlay');
  const file = document.querySelector('#upload-file');
  if (changeImg.classList.contains('hidden')) {
    return;
  }

  changeImg.classList.add('hidden');
  document.body.classList.remove('modal-open');
  file.value = '';
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';

  const buttonValue = form.querySelector('.scale__control--value');
  buttonValue.value = '100%';
  const image = document.querySelector('.img-upload__preview img');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';

  const slider = document.querySelector('.effect-level__slider');
  slider.noUiSlider.set(1);

  const buttonSubmit = document.querySelector('.img-upload__submit');
  buttonSubmit.disabled = false;
  pristine.reset();

  const effectNone = document.querySelector('#effect-none');
  effectNone.checked = true;
};

//скрытие отображение картинки по клику на пустую область
const closeImg = document.querySelector('.img-upload__overlay');
closeImg.addEventListener('click', (evt) => {
  if (document.querySelector('.error') !== null) {
    const sectionError = document.querySelector('.error');
    document.querySelector('.pictures').removeChild(sectionError);
    return;
  }

  if (document.querySelector('.success') !== null) {
    const sectionError = document.querySelector('.success');
    document.querySelector('.pictures').removeChild(sectionError);
    close();
    return;
  }

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
  const noFocus = (form.querySelector('.text__hashtags') !== document.activeElement) && (form.querySelector('.text__description') !== document.activeElement);

  if (document.querySelector('.error') !== null) {
    evt.preventDefault();
    const sectionError = document.querySelector('.error');
    document.querySelector('.pictures').removeChild(sectionError);
    const buttonSubmit = document.querySelector('.img-upload__submit');
    buttonSubmit.disabled = false;
    return;
  }

  if (document.querySelector('.success') !== null) {
    evt.preventDefault();
    const sectionError = document.querySelector('.success');
    document.querySelector('.pictures').removeChild(sectionError);
    const buttonSubmit = document.querySelector('.img-upload__submit');
    buttonSubmit.disabled = true;
    close();
    return;
  }

  if ((evt.key === 'Escape') && (noFocus)) {
    evt.preventDefault();
    close();
  }
});

const validateForm = () => {
  const validateHashTag = (value) => /^#[a-zа-яё0-9]{1,20}$/i.test(value);

  const validateHashTagBlank = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    return countErrorHashTag.length === 0;
  };

  const validateHashTagCount = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    return words.length <= 5;
  };

  const validateHashTagRepeat = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const repeatWords = new Set(words);
    return words.length === repeatWords.size;
  };

  const validateComments = () => {
    const input = form.querySelector('.text__description').value;
    return input.length <= 140;
  };

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagBlank, 'недопустипый хэштег');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagCount, 'хэштегов больше 5');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagRepeat, 'есть повторяющиеся хэштеги');
  pristine.addValidator(form.querySelector('.text__description'), validateComments, 'комментариев больше 140');


};

const showOkMessange = () => {
  const ok = document.querySelector('#success').content.cloneNode(true);
  document.querySelector('.pictures').appendChild(ok);
  const sectionError = document.querySelector('.success');
  const buttonSubmit = document.querySelector('.img-upload__submit');
  buttonSubmit.disabled = true;

  sectionError.addEventListener('click', (evt) => {
    const successInner = document.querySelector('.success__inner');

    if (evt.target !== successInner) {
      buttonSubmit.disabled = false;
      document.querySelector('.pictures').removeChild(sectionError);
    }
  });
};

const showErrorMessange = () => {
  const error = document.querySelector('#error').content.cloneNode(true);
  document.querySelector('.pictures').appendChild(error);
  const sectionError = document.querySelector('.error');
  const buttonSubmit = document.querySelector('.img-upload__submit');
  buttonSubmit.disabled = false;

  sectionError.addEventListener('click', (evt) => {
    const errorInner = document.querySelector('.error__inner');

    if (evt.target !== errorInner) {
      document.querySelector('.pictures').removeChild(sectionError);
    }
  });
};

const setOnFormSubmit = () => {
  const buttonSubmit = document.querySelector('.img-upload__submit');

  buttonSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    buttonSubmit.disabled = true;
    //const t = () => pristine.validate();

    if (pristine.validate()) {
      const data = new FormData(form);
      sendData(data).then(() => {showOkMessange(); close()}).catch(showErrorMessange);
    } else {
      buttonSubmit.disabled = false;
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const data = new FormData(form);
      buttonSubmit.disabled = false;
      pristine.reset();
      sendData(data).then(() => {showOkMessange(); close()}).catch(showErrorMessange);
    }
  });
};

const loadFormImg = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
    const buttonSubmit = document.querySelector('.img-upload__submit');
    buttonSubmit.disabled = true;
    //отобразим картинку если jpg png
    if (file.files[0].name.endsWith('jpg') || file.files[0].name.endsWith('png')) {
      const changeImg = document.querySelector('.img-upload__overlay');
      changeImg.classList.remove('hidden');
      document.body.classList.add('modal-open');

      buttonSubmit.disabled = false;

      const image = document.querySelector('.img-upload__preview img');
      image.src = URL.createObjectURL(file.files[0]);
      const effectImgs = document.querySelectorAll('.effects__preview');
      effectImgs.forEach((img) => {
        img.style.backgroundImage = `url(${image.src})`;
      });
    }
  });
};

const scaleImage = () => {
  const buttonSmall = form.querySelector('.scale__control--smaller');
  const buttonBig = form.querySelector('.scale__control--bigger');
  const buttonValue = form.querySelector('.scale__control--value');
  buttonValue.value = '100%';

  const zoomImg = (direction) => {
    const image = document.querySelector('.img-upload__preview img');
    const digitValue = Number(buttonValue.value.replace('%',''));

    if ((digitValue === 25) && (direction < 0)) {
      direction = 0;
    }

    if ((digitValue === 100) && (direction > 0)) {
      direction = 0;
    }

    buttonValue.value = `${digitValue + direction}%`;
    image.style.transform = `scale(${(digitValue + direction) / 100})`;
  };

  buttonSmall.addEventListener('click', () => zoomImg(-25));
  buttonBig.addEventListener('click', () => zoomImg(25));
};

const changeFilterEffect = () => {
  const effectChrome = document.querySelector('#effect-chrome');
  const effectSepia = document.querySelector('#effect-sepia');
  const effectMarvin = document.querySelector('#effect-marvin');
  const effectPhobos = document.querySelector('#effect-phobos');
  const effectHeat = document.querySelector('#effect-heat');
  const effectsList = document.querySelector('.effects__list');
  const image = document.querySelector('.img-upload__preview img');
  const slider = document.querySelector('.effect-level__slider');
  const sliderValue = document.querySelector('.effect-level__value');
  const fieldSlider = document.querySelector('.img-upload__effect-level');

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.10,
    connect: 'lower',
  });

  const setValueEffect = () => {
    const value = sliderValue.value;

    fieldSlider.classList.remove('hidden');

    switch (true) {
      case (effectChrome.checked) :
        image.style.filter = `grayscale(${value})`;
        break;
      case (effectSepia.checked) :
        image.style.filter = `sepia(${value})`;
        break;
      case (effectMarvin.checked) :
        image.style.filter = `invert(${value})`;
        break;
      case (effectPhobos.checked) :
        image.style.filter = `blur(${value * 3}px)`;
        break;
      case (effectHeat.checked) :
        image.style.filter = `brightness(${1 + value * 2})`;
        break;
      default:
        image.style.filter = 'none';
        sliderValue.value = 1;
        fieldSlider.classList.add('hidden');
        break;
    }
  };

  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    sliderValue.setAttribute('value', slider.noUiSlider.get());
    setValueEffect();
  });

  effectsList.addEventListener('click', () => {
    sliderValue.value = 1;
    slider.noUiSlider.set(1);
    setValueEffect();
  });
};

export {validateForm, scaleImage, loadFormImg, changeFilterEffect, setOnFormSubmit};
