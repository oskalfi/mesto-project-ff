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

export function isValid(formElement, inputElement, validationConfig) {
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
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  inputElement.classList.add(validationConfig.inputTypeErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
}

export function hideInputError(formElement, inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputTypeErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
}

export function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.formInputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.formButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.buttonTypeInactiveClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.buttonTypeInactiveClass);
  }
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.formInputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.formButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}
