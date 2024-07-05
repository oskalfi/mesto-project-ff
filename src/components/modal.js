export function openModal(modalWindow) {
  // открытие модального окна
  modalWindow.style.display = "grid";
  modalWindow.setAttribute("tabindex", "-1");
  modalWindow.focus();
}

export function closeModal(modalWindow) {
  // закрытие модального окна
  modalWindow.style.display = "none";
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
