export function openModal(modalWindow) {
  // делаем модальное окно видимым
  modalWindow.classList.add("popup_is-opened");

  // ставим на модальное окно него атрибут tabIndex, чтобы была возможность использовать функцию focus()
  modalWindow.setAttribute("tabindex", "-1");

  // используем функцию focus(), чтобы не вешать слушатель события на document, а повесить его именно на модальное окно
  // так как в функции обработчике я использовал this.
  modalWindow.focus();
}

export function closeModal(modalWindow) {
  // закрытие модального окна
  modalWindow.classList.remove("popup_is-opened");
}

// закрытие при клике на оверлей
export function closeOverlay(event) {
  if (event.target === event.currentTarget) {
    // event.target вернёт элемент, на котором произошел клик
    closeModal(this);
    event.target.removeEventListener("click", closeOverlay);
  }
}

// закрытие при нажатаии на Escape
export function closeEsc(event) {
  if (event.key === "Escape") {
    closeModal(this);
    this.removeEventListener("keydown", closeEsc);
  }
}
