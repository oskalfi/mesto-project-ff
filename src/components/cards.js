// массив первых 6 карточек страницы

import { cardTemplate, placesList, modalImage } from "../scripts/index.js";
import { openModal, closeModal } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector(".card__title").textContent = cardData.name;

  // Повесили обработчик клика по иконке удаления карточки
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  // Далее организация модального окна при клике на изображение карточки
  cardImage.addEventListener("click", function openCard() {
    openModal(modalImage); // показали попап
    const image = modalImage.querySelector(".popup__image"); // достали в модальном окне контейнер для изображения
    image.src = cardData.link;
    image.alt = cardData.name;
    modalImage.querySelector(".popup__caption").textContent = image.alt; // достали контейнер подписи изображения и добавили в него текст

    // напишем логику закрытия карточки
    // сначала лоигка закрытия при нажатии на кнопку
    const closeImageButton = modalImage.querySelector(".popup__close");

    closeImageButton.addEventListener("click", function closeClick() {
      closeModal(modalImage);
      closeImageButton.removeEventListener("click", closeClick);
    });

    // логика закрытия при нажатии на оверлей
    modalImage.addEventListener("click", function closeOverlay(event) {
      // если клик произойдёт именно по оверлею, а не его дочерним элементам, то
      if (event.target === modalImage) {
        closeModal(modalImage);
        modalImage.removeEventListener("click", closeOverlay);
      }
    });

    // логика закрытия при нажатии на Escape
    document.addEventListener("keydown", function closeEsc(event) {
      if (event.key === "Escape") {
        closeModal(modalImage);
        document.removeEventListener("keydown", closeEsc);
      }
    });
  });

  return card;
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  //обращаемся к объекту события (иконке удаления) и вызываем на нём метод closest,
  // чтобы иметь возможность обратиться к карточке
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
export function displayCards() {
  for (const place of initialCards) {
    placesList.append(createCard(place, deleteCard));
  }
}
