// @todo: Функция создания карточки
import { initialCards } from "./cards.js";
import { placesList, cardTemplate, modalImage } from "../scripts/index.js";
import { openModal, closeModal } from "./modal.js";

export function createCard(cardData, deleteCard, likeCard) {
  // создадим карточку
  // сначала достанем шаблон из разметки
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  // достанем из созданной карточки элемент контейнер изображения для удобства обращения
  const cardImage = card.querySelector(".card__image");
  // присвоим значения атрибутам src и alt. Возьмём их из импортированного массива объектов initialCards
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  // добавим подпись карточке. Подпись === alt изображения
  card.querySelector(".card__title").textContent = cardData.name;

  // Повесим обработчик клика по кнопке удаления карточки
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  // повесим обработчик клика по кнопке
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  // повесим обработчик клика по изображению
  cardImage.addEventListener("click", openCard);

  return card;
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  //обращаемся к объекту события (иконке удаления) и вызываем на нём метод closest,
  // чтобы иметь возможность обратиться к карточке
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// функция лайка карточки
export function likeCard(event) {
  const isLiked = event.target.style.background.includes(
    'url("images/like-active.svg")'
  );
  if (isLiked) {
    event.target.style.background = "url('images/like-inactive.svg')";
  } else {
    event.target.style.background = "url('images/like-active.svg')";
  }
}

export function openCard(event) {
  openModal(modalImage); // показали попап
  const image = modalImage.querySelector(".popup__image"); // достали в модальном окне контейнер для изображения
  image.src = event.target.src;
  image.alt = event.target.alt;
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
}

// @todo: Вывести карточки на страницу
export function displayCards() {
  for (const place of initialCards) {
    placesList.append(createCard(place, deleteCard, likeCard));
  }
}
