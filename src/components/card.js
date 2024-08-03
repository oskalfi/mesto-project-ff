// @todo: Функция создания карточки
import { deleteCardFromServer, putLike, unlike } from "../scripts/api.js";

export function createCard(
  cardTemplate,
  cardData,
  openCard,
  deleteCard,
  likeCard,
  cardOwnerId,
  currentProfileId,
  cardId,
  cardLikesValue
) {
  // создадим карточку
  // сначала достанем шаблон из разметки
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  // достанем из созданной карточки элемент контейнер изображения для удобства обращения
  const cardImage = card.querySelector(".card__image");
  // присвоим значения атрибутам src и alt. Возьмём их из импортированного массива объектов initialCards
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardLikesContainer = card.querySelector(".card__like-button-likes"); // выведем количество лайков
  cardLikesContainer.textContent = cardLikesValue.length;

  // добавим подпись карточке. Подпись === alt изображения
  card.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = card.querySelector(".card__delete-button");
  // Повесим обработчик клика по кнопке удаления карточки
  if (cardOwnerId === currentProfileId) {
    // если текущий пользователь создатель карточки — тогда добавляем функцию удаления, иначе удаляем иконку удаления
    deleteButton.addEventListener("click", (event) => {
      deleteCardFromServer(cardId);
      deleteCard(event);
    });
  } else {
    deleteButton.remove();
  }

  // повесим обработчик клика по кнопке
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", (event) => {
    likeCard(event, cardId, cardLikesContainer);
  });

  // проверим, ставил ли текущий пользователь лайк на карточку
  // если да — добавим кнопке лайка класс active
  cardLikesValue.forEach((like) => {
    if (like["_id"] === currentProfileId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

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
export function likeCard(event, cardId, cardLikesContainer) {
  if (event.target.className.includes("is-active")) {
    console.log("Вы сняли лайк!");
    unlike(cardId, cardLikesContainer);
    event.target.classList.toggle("card__like-button_is-active");
  } else {
    console.log("Вы поставили лайк!");
    putLike(cardId, cardLikesContainer);
    event.target.classList.toggle("card__like-button_is-active");
  }
}
