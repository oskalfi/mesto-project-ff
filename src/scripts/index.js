import "../pages/index.css";
import { initialCards } from "../components/cards.js";

import {
  openModal,
  closeModal,
  setCloseModalEventListeners,
} from "../components/modal.js";

import { createCard, deleteCard, likeCard } from "../components/card.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// достанем скрытые модальные окна из разметки
export const modalEditProfile = document.querySelector(".popup_type_edit");
export const modalAddPlace = document.querySelector(".popup_type_new-card");
export const modalImage = document.querySelector(".popup_type_image");

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
  const userCard = createCard(
    cardTemplate,
    userCardData,
    openCard,
    deleteCard,
    likeCard
  ); // создадим карточку
  placesList.prepend(userCard); // вставим карточку в начало контейнера
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
const formEditProfile = document.forms["edit-profile"]; // вынесем форму в отдельную переменную
const inputProfileTitle = formEditProfile.elements.name; // обратились к полям формы, нашли поле с именем name
const inputProfileDescription = formEditProfile.elements.description; // нашли поле с именем description

function submitEditProfile(event) {
  // опишем логику
  event.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(modalEditProfile);
}

formEditProfile.addEventListener("submit", submitEditProfile);

// достанем кнопку редактирования
const editProfileButton = document.querySelector(".profile__edit-button");

// опишем логику открытия модального окна после нажатия на кнопку редактирования
editProfileButton.addEventListener("click", () => {
  openModal(modalEditProfile); // при клике откроем модальное окно
  inputProfileTitle.value = profileTitle.textContent; // полю с именем name присвоили значение имени, отображаемое на странице
  inputProfileDescription.value = profileDescription.textContent;
});

// Проделаем то же самое, но с модальным окном добавления новой карточки
const addPlaceButton = document.querySelector(".profile__add-button"); // Достали кнопку «+» из разметки
addPlaceButton.addEventListener("click", () => {
  openModal(modalAddPlace);
});

export function openCard(event) {
  openModal(modalImage); // показали попап
  const image = modalImage.querySelector(".popup__image"); // достали в модальном окне контейнер для изображения
  image.src = event.target.src;
  image.alt = event.target.alt;
  modalImage.querySelector(".popup__caption").textContent = image.alt; // достали контейнер подписи изображения и добавили в него текст
}

// @todo: Вывести карточки на страницу
export function displayCards(initialCards) {
  for (const place of initialCards) {
    placesList.append(
      createCard(cardTemplate, place, openCard, deleteCard, likeCard)
    );
  }
}

displayCards(initialCards); // вывели карточки
