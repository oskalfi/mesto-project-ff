import "../pages/index.css";

import {
  openModal,
  closeModal,
  setCloseModalEventListeners,
} from "../components/modal.js";

import { createCard, deleteCard, likeCard } from "../components/card.js";

import { enableValidation, clearValidation } from "./validation.js";

import {
  config,
  getProfileInfo,
  getCards,
  editProfileInfo,
  makeNewCard,
  changeAvatar,
} from "./api.js";

const validationConfig = {
  // объект классов и селекторов для валидации
  formSelector: ".popup__form",
  formInputSelector: ".popup__input",
  formButtonSelector: ".popup__button",
  inputTypeErrorClass: "popup__input-type-error",
  buttonTypeInactiveClass: "popup__button_inactive",
  buttonTypeActiveClass: "popup__button_inactive",
};

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// достанем скрытые модальные окна из разметки
export const modalEditProfile = document.querySelector(".popup_type_edit");
export const modalAddPlace = document.querySelector(".popup_type_new-card");
export const modalImage = document.querySelector(".popup_type_image");
export const modalAvatar = document.querySelector(".popup_type_avatar");

// повесим на все модальные окна слушатели клика по оверлею и кнопке закрытия, а также добавим им класс is-animated,
// чтобы при первом же открытии они открывались плавно
const modalWindows = document.querySelectorAll(".popup");
modalWindows.forEach((modalWindow) => {
  setCloseModalEventListeners(modalWindow);
  modalWindow.classList.add("popup_is-animated");
});

// далее повесим обработчики на кнопку сохранить модальных окон, где она есть
// 1. сначала модальное окно добавления карточки:
// достанем форму данного модального окна
const formAddPlace = document.forms["new-place"];
// достанем поля формы
const placeName = formAddPlace.elements["place-name"];
const placeLink = formAddPlace.elements.link;

function submitAddPlace(event) {
  event.preventDefault();
  // здесь нам надо сделать так, чтобы данные попали в функцию создания карточки createCard, которая в свою очередь принимает объект
  // объединим введённые данные в объект
  const userCardData = {
    name: placeName.value,
    link: placeLink.value,
  };

  const userCard = makeNewCard(placeName.value, placeLink.value).then((res) => {
    const userCard = createCard(
      cardTemplate,
      userCardData,
      openCard,
      deleteCard,
      likeCard,
      res.owner["_id"],
      config.profileId,
      res["_id"],
      res.likes
    );
    placesList.prepend(userCard); // вставим карточку в начало контейнера
  }); // создадим карточку, отправим её на сервер, и вставим в разметку

  // после создания карточки из модального окна сотрём введённые пользователем данные
  placeName.value = "";
  placeLink.value = "";
  // после чего закроем модальное окно
  closeModal(modalAddPlace);
}

formAddPlace.addEventListener("submit", submitAddPlace);

// 2. теперь модальное окно редактирования профиля
//сделаем так, чтобы поля формы были заполнены теми данными, которые отображаются на странице
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.forms["edit-profile"]; // вынесем форму в отдельную переменную
const inputProfileTitle = formEditProfile.elements.name; // обратились к полям формы, нашли поле с именем name
const inputProfileDescription = formEditProfile.elements.description; // нашли поле с именем description
const buttonSubmitEditProfile = formEditProfile.querySelector(".button");

function submitEditProfile(event) {
  // опишем логику
  event.preventDefault();
  buttonSubmitEditProfile.textContent = "Сохранение..."; // улучшим UX. Перед выполнением запроса на сервер изменим текст кнопки
  profileTitle.textContent = inputProfileTitle.value;
  profileDescription.textContent = inputProfileDescription.value;
  editProfileInfo(
    profileTitle.textContent,
    profileDescription.textContent,
    buttonSubmitEditProfile // передадим элемент кнопки, чтобы после выполнения промиса текст кнопки снова поменять на «Сохранить»
  ).then((res) => {
    buttonSubmitEditProfile.textContent = "Сохранить";
  });
  closeModal(modalEditProfile);
}

formEditProfile.addEventListener("submit", submitEditProfile);

// достанем кнопку редактирования
const editProfileButton = document.querySelector(".profile__edit-button");

// опишем логику открытия модального окна после нажатия на кнопку редактирования
editProfileButton.addEventListener("click", () => {
  openModal(modalEditProfile); // при клике откроем модальное окно
  const formElement = document.forms["edit-profile"];
  clearValidation(formElement, validationConfig);
  inputProfileTitle.value = profileTitle.textContent; // полю с именем name присвоили значение имени, отображаемое на странице
  inputProfileDescription.value = profileDescription.textContent;
});

// Проделаем то же самое, но с модальным окном добавления новой карточки
const addPlaceButton = document.querySelector(".profile__add-button"); // Достали кнопку «+» из разметки
addPlaceButton.addEventListener("click", () => {
  openModal(modalAddPlace);
  placeName.value = "";
  placeLink.value = "";
  clearValidation(formAddPlace, validationConfig);
});

// 3. Модальное окно изменения аватара
// Добавим открытие модального окна изменения аватара
const profileAvatar = document.querySelector(".profile__image");
const formChangeAvatar = document.forms["edit-avatar"];
const linkInput = modalAvatar.querySelector("#avatar-input");

function submitChangeAvatar(event) {
  event.preventDefault();
  changeAvatar(linkInput.value, profileAvatar).then((res) => {
    profileAvatar.style = `background-image: url(${res.avatar})`;
  });
  closeModal(modalAvatar);
}

formChangeAvatar.addEventListener("submit", submitChangeAvatar);

profileAvatar.addEventListener("click", () => {
  openModal(modalAvatar);
  linkInput.value = "";
  clearValidation(formChangeAvatar, validationConfig);
});

const popupImageContainer = modalImage.querySelector(".popup__image");
const popupImageCaption = modalImage.querySelector(".popup__caption");

export function openCard(event) {
  openModal(modalImage); // показали попап
  popupImageContainer.src = event.target.src;
  popupImageContainer.alt = event.target.alt;
  popupImageCaption.textContent = popupImageContainer.alt; // в качестве подписи взяли значение атрибута alt
}

enableValidation(validationConfig);

// Далее следует запрос на сервер, для получения данных профиля и карточек

Promise.all([
  getProfileInfo(profileTitle, profileDescription, profileImage),
  getCards(),
]).then((responseArray) => {
  // разобъем ответ сервера на две отдельные переменные
  const profileRes = responseArray[0];
  const cardsRes = responseArray[1];

  // обработка данных профиля
  profileTitle.textContent = profileRes.name;
  profileDescription.textContent = profileRes.about;
  profileImage.style = `background-image: url(${profileRes.avatar})`;
  config.profileId = profileRes["_id"];

  //обработка данных карточек
  for (const place of cardsRes) {
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
});
