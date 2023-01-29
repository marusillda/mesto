/**
 * Показать сообщение об ошибке
 * @param {HTMLElement} errorElement
 * @param {String} errorMessage
 */
const showInputError = (errorElement, errorMessage) => {
  errorElement.textContent = errorMessage;
};

/**
 * Скрыть сообщение об ошибке
 * @param {HTMLElement} errorElement
 */
const hideInputError = (errorElement) => {
  errorElement.textContent = '';
};

/**
 * Проверяет валидность поля ввода
 * @param {HTMLElement} formInput
 * @returns {boolean}
 */
const isInputValid = (formInput) => formInput.validity.valid;

/**
 * Помечает поле ввода невалидным
 * @param {HTMLElement} formInput
 * @param {String} inputErrorClass
 */
const markInputError = (formInput, inputErrorClass) => {
  formInput.classList.add(inputErrorClass);
};

/**
 * Помечает поле валидным
 * @param {HTMLElement} formInput
 * @param {String} inputErrorClass
 */
const unmarkInputError = (formInput, inputErrorClass) => {
  formInput.classList.remove(inputErrorClass);
};

/**
 * Определяет класс контейнера с ошибкой для переданного идентификатора поля ввода
 * @param {String} formInputId
 * @returns
 */
const getErrorElementClass = (formInputId) => `.${formInputId}-error`;

/**
 * Деактивирует Submit Button
 * @param {HTMLElement} submitButton
 */
const disableSubmitButton = (submitButton) => {
  submitButton.disabled = true;
};

/**
 * Активирует Submit Button
 * @param {HTMLElement} submitButton
 */
const enableSubmitButton = (submitButton) => {
  submitButton.disabled = false;
};

/**
 * Деактивирует Submit Button если хотя бы одно поле ввода не валидно
 * @param {array <HTMLElement>} inputList
 * @param {HTMLElement} submitButton
 */
const toggleButtonState = (inputList, submitButton) => {
  const hasInvalidInput = inputList.some((formInput) => !isInputValid(formInput));

  if (hasInvalidInput) {
    disableSubmitButton(submitButton);
  } else {
    enableSubmitButton(submitButton);
  }
};

/**
 * Активирует валидацию для всех форм на странице
 * @param {{
 *  formSelector: string,
*   inputSelector: string,
*   inputErrorClass: string,
*   submitButtonSelector: string
 * }} param0
 */
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = document.querySelectorAll(formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

/**
 * настройка "живой" валидации для переданной формы
 * @param {HTMLElement} formElement
 * @param {{
*   inputSelector: string,
*   inputErrorClass: string,
*   submitButtonSelector: string
 * }} param1
 */
const setEventListeners = (formElement, { inputSelector, inputErrorClass, submitButtonSelector}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputList.forEach((formInput) => {
    const errorElement = formElement.querySelector(getErrorElementClass(formInput.id));
    formInput.addEventListener('input', () => {
      if (isInputValid(formInput)){
        hideInputError(errorElement);
        unmarkInputError(formInput, inputErrorClass);
      } else {
        showInputError(errorElement, formInput.validationMessage);
        markInputError(formInput, inputErrorClass);
      }

      toggleButtonState(inputList, submitButton);
    });
  });
};

