const getData = () =>
  fetch('https://29.javascript.pages.academy/kekstagram/data', {method: 'GET'})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error('Какая-то ошибка');
    });

const sendData = (body = null) =>
  fetch('https://29.javascript.pages.academy/kekstagram/', {method: 'POST', body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error('Какая-то ошибка');
    });

export {getData, sendData};
