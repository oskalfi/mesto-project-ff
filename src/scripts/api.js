export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
  },
};

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, config).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, config).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const editProfileInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const makeNewCard = (placeName, imageLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName,
      link: imageLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const unlike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
