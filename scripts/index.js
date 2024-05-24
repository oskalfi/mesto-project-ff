// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(initialCards, deleteCard) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	card.querySelector('.card__image').src = `${initialCards.link}`;
	card.querySelector('.card__title').textContent = `${initialCards.name}`;

	// Повесили обработчик клика по иконке удаления карточки
	const deleteButton = card.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', deleteCard);

	return card;
}

// @todo: Функция удаления карточки
function deleteCard() {
	//обращаемся к объекту события (иконке удаления) и вызываем на нём метод closest, 
	// чтобы иметь возможность обратиться к карточке
	const listItem = event.target.closest('.card');
	listItem.remove();
}

// @todo: Вывести карточки на страницу
function displayCard() {
	for(const place of initialCards) {
	placesList.append(createCard(place, deleteCard));
	}
}

displayCard();