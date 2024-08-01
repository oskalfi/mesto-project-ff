// функция isValid(), которая присваивает или не присваивает элементу поля формы класс ошибки, в зависимости от валидности поля.
// принимает на вход форму и поле ввода.

// функция showInputError вызывается в функции isValid(), если input-элемент validity false. Принимает на вход input-элемент
// функция hideInputError вызывается в функции isValid(), если input-элемент validity true. Также принимает на вход input элемент

// функция setEventListeners() — принимает на вход форму, составляет массив из всех полей формы,
// и навешивает на все поля формы слушатель события input. обработчик события — функция isValid()

// функция enableValidation() - найдёт все формы на странице, и для каждой формы вызовет функцию setEventListeners()

// // // // // // кнопка

// функция hasInvalidInput(), которая на вход принимает массив полей формы и возвращает true или false

// функция toggleButtonState(), принимает на вход массив полей формы, которая вызывает hasInvalidInput, и в зависимости от результата делает
// кнопку активной или отключенной. Данная функция вызывается в первый раз из функции setEventListeners(), чтобы кнопка была неактивна до ввода данных
// а затем из обработчика события input поля ввода.

export function isValid(formElement, inputElement) {
  // валидация рег.выражениями
  const regex = /[^a-zа-яё\s\-]/iu;
  const regexSpaces = /^\s+/;

  if (regex.test(inputElement.value) && inputElement.type !== "url") {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (regexSpaces.test(inputElement.value)) {
    inputElement.setCustomValidity("Пробел в начале строки");
  } else {
    inputElement.setCustomValidity("");
  }

  // валидация атрибутами
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

export function showInputError(formElement, inputElement, errorMessage) {
  inputElement.classList.add("popup__input-type-error");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
}

export function hideInputError(formElement, inputElement) {
  inputElement.classList.remove("popup__input-type-error");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
}

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
}

export function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}
