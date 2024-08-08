export function openModal(modalWindow) {
  // делаем модальное окно видимым
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

export function closeModal(modalWindow) {
  // закрытие модального окна
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

// закрытие при нажатаии на Escape
export function closeEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function setCloseModalEventListeners(modalWindow) {
  // слушатель клика по кнопке
  // достанем кнопку закрытия модального окна редактирования профиля
  const buttonClosePopup = modalWindow.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => {
    closeModal(modalWindow); // при клике закроем модальное окно
  });

  // слушатель клика на оверлей
  modalWindow.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      // event.target вернёт элемент, на котором произошел клик
      closeModal(modalWindow);
    }
  });
}
