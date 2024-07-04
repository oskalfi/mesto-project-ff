// функция открытия модального окна
// функции закрытия модального окна (на кнопку, на оверлей, на escape)

export function openModal(modalWindow) {
  // открытие модального окна
  modalWindow.style.display = "grid";
}

export function closeModal(modalWindow) {
  // закрытие модального окна
  modalWindow.style.display = "none";
}
