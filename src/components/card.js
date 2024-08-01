// @todo: Функция создания карточки
import { deleteCardFromServer } from "../scripts/api.js";

export function createCard(
  cardTemplate,
  cardData,
  openCard,
  deleteCard,
  likeCard,
  cardOwnerId,
  currentProfileId,
  cardId
) {
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

  const deleteButton = card.querySelector(".card__delete-button");
  // Повесим обработчик клика по кнопке удаления карточки
  if (cardOwnerId === currentProfileId) {
    deleteButton.addEventListener("click", (event) => {
      deleteCardFromServer(cardId);
      deleteCard(event);
    });
  } else {
    deleteButton.remove();
  }

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
  event.target.classList.toggle("card__like-button_is-active");
}
