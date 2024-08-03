export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
  },
};

export const getProfileInfo = (
  profileTitleContainer,
  profileDescriptionContainer,
  profileImageContainer
) => {
  return fetch(`${config.baseUrl}/users/me`, config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      profileTitleContainer.textContent = res.name;
      profileDescriptionContainer.textContent = res.about;
      profileImageContainer.style = `background-image: url(${res.avatar})`;
      config.profileId = res["_id"];
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCards = (
  createCard,
  placesList,
  cardTemplate,
  openCard,
  deleteCard,
  likeCard
) => {
  return fetch(`${config.baseUrl}/cards`, config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      for (const place of res) {
        placesList.append(
          createCard(
            cardTemplate,
            place,
            openCard,
            deleteCard,
            likeCard,
            place.owner["_id"], // id создателя карточки
            config.profileId, // id нашего профиля
            // если id не будут совпадать, то иконку удаления сотрём
            place["_id"],
            place.likes // передадим количество лайков
          )
        );
      }
    })
    .catch((error) => {
      console.log(error);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log("New profile info");
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log("New card:");
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  });
};

export const putLike = (cardId, cardLikesContainer) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      cardLikesContainer.textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const unlike = (cardId, cardLikesContainer) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "bd73c30f-b229-43da-9111-af67cbae75e9",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      cardLikesContainer.textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
};
