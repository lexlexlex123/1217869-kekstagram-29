const data = (response) => {
    if (!response.ok) {
      return new Error();
    }
    return response.json();
}

const getData = () =>
  fetch('https://29.javascript.pages.academy/kekstagram/data', {method: 'GET'})
    .then((response) => data(response))
    .catch(() => {
      throw new Error('Какая-то ошибка получения данных');
    });

const sendData = (body = null) =>
  fetch('https://29.javascript.pages.academy/kekstagram/', {method: 'POST', body})
    .then((response) => data(response))
    .catch(() => {
      throw new Error('Какая-то ошибка отправки данных');
    });

export {getData, sendData};
