import "../pages/index.css";
import { displayCards } from "../components/card.js";
import {
  createCard,
  deleteCard,
  likeCard,
  openCard,
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closeOverlay,
  closeEsc,
} from "../components/modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// достанем скрытые модальные окна из разметки
export const modalEditProfile = document.querySelector(".popup_type_edit");
export const modalAddPlace = document.querySelector(".popup_type_new-card");
export const modalImage = document.querySelector(".popup_type_image");

// сразу повесим на них класс is-animated, чтобы при первом же открытии они открывались плавно
modalEditProfile.classList.add("popup_is-animated");
modalAddPlace.classList.add("popup_is-animated");
modalImage.classList.add("popup_is-animated");

// достанем кнопку редактирования
const editProfileButton = document.querySelector(".profile__edit-button");

// опишем логику открытия модального окна после нажатия на кнопку редактирования
editProfileButton.addEventListener("click", () => {
  openModal(modalEditProfile); // при клике откроем модальное окно

  //сделаем так, чтобы поля формы были заполнены теми данными, которые отображаются на странице
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const formEditProfile = document.forms["edit-profile"]; // вынесем форму в отдельную переменную для удобства обращения
  const inputProfileTitle = formEditProfile.elements.name; // обратились к полям формы, нашли поле с именем name
  inputProfileTitle.value = profileTitle.textContent; // полю с именем name присвоили значение имени, отображаемое на странице
  const inputProfileDescription = formEditProfile.elements.description; // нашли поле с именем description
  inputProfileDescription.value = profileDescription.textContent;

  // далее пропишем логику сохранения введённых пользователем данных

  formEditProfile.addEventListener("submit", function submitEditProfile(event) {
    // опишем логику
    event.preventDefault();
    profileTitle.textContent = inputProfileTitle.value;
    profileDescription.textContent = inputProfileDescription.value;
    closeModal(modalEditProfile);
    formEditProfile.removeEventListener("submit", submitEditProfile);
  });

  // далее пропишем логику закрытия модального окна
  // достанем кнопку закрытия модального окна редактирования профиля
  const buttonClosePopup = modalEditProfile.querySelector(".popup__close");
  // логика закрытия модального окна при нажатии на кнопку
  buttonClosePopup.addEventListener("click", function closeClick() {
    closeModal(modalEditProfile); // при клике закроем модальное окно
    buttonClosePopup.removeEventListener("click", closeClick); // удалим слушатель с кнопки закрытия
  });

  // логика закрытия модального окна при нажатии на оверлей
  modalEditProfile.addEventListener("click", closeOverlay);

  // логика закрытия модального окна при нажатии на Escape
  modalEditProfile.addEventListener("keydown", closeEsc);
});

// Проделаем то же самое, но с модальным окном добавления новой карточки
const addPlaceButton = document.querySelector(".profile__add-button"); // Достали кнопку «+» из разметки
addPlaceButton.addEventListener("click", () => {
  openModal(modalAddPlace);

  // добавим пользователю возможность создания карточки
  // достанем форму данного модального окна
  const formAddPlace = document.forms["new-place"];
  // достанем поля формы
  const placeName = formAddPlace.elements["place-name"];
  const placeLink = formAddPlace.elements.link;
  // далее повесим обработчик на событиие submit формы

  formAddPlace.addEventListener("submit", function submitAddPlace(event) {
    event.preventDefault();
    // здесь нам надо сделать так, чтобы данные попали в функцию создания карточки createCard, которая в свою очередь принимает объект
    // объединим введённые данные в объект
    const userCardData = {
      name: placeName.value,
      link: placeLink.value,
    };
    const userCard = createCard(userCardData, deleteCard, likeCard, openCard); // создадим карточку
    placesList.prepend(userCard); // вставим карточку в начало контейнера
    // после создания карточки из модального окна сотрём введённые пользователем данные
    placeName.value = "";
    placeLink.value = "";
    // после чего закроем модальное окно
    closeModal(modalAddPlace);
    formAddPlace.removeEventListener("submit", submitAddPlace);
  });

  // достанем кнопку закрытия данного модального окна
  const buttonClosePopup = modalAddPlace.querySelector(".popup__close");
  // повесим слушатель клика по данной кнопке
  buttonClosePopup.addEventListener("click", () => {
    closeModal(modalAddPlace);
  });

  // повесим слушатель клика по оверлею
  modalAddPlace.addEventListener("click", closeOverlay);
  modalAddPlace.addEventListener("keydown", closeEsc);
});

displayCards(); // вывели карточки
