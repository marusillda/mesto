export default class FormValidator{
  /**
   *
   * @param {{
   *   inputSelector: string,
   *   inputErrorClass: string,
   *   submitButtonSelector: string
   * }} validationOptions
   * @param {HTMLElement} formElement
  */
  constructor(validationOptions, formElement){
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._validationOptions);
  }

/**
 * Проверяет валидность поля ввода
 * @param {HTMLElement} formInput
 * @returns {boolean}
 */
_isInputValid = (formInput) => formInput.validity.valid;

/**
 * настройка "живой" валидации для переданной формы
 * @param {HTMLElement} formElement
 * @param {{
 *   inputSelector: string,
 *   inputErrorClass: string,
 *   submitButtonSelector: string
 * }} validationOptions
 */

/**
 * Скрыть сообщение об ошибке
 * @param {HTMLElement} errorElement
 */
_hideInputError(errorElement) {
  errorElement.textContent = '';
};

/**
 * Помечает поле валидным
 * @param {HTMLElement} formInput
 * @param {String} inputErrorClass
 */
_unmarkInputError(formInput, inputErrorClass) {
  formInput.classList.remove(inputErrorClass);
};

/**
 * Показать сообщение об ошибке
 * @param {HTMLElement} errorElement
 * @param {String} errorMessage
 */
_showInputError(errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
};

/**
 * Помечает поле ввода невалидным
 * @param {HTMLElement} formInput
 * @param {String} inputErrorClass
 */
_markInputError(formInput, inputErrorClass) {
  formInput.classList.add(inputErrorClass);
};

/**
 * Определяет класс контейнера с ошибкой для переданного идентификатора поля ввода
 * @param {String} formInputId
 * @returns
 */
_getErrorElementClass = (formInputId) => `.${formInputId}-error`;

/**
 * Деактивирует Submit Button
 * @param {HTMLElement} submitButton
 */
_disableSubmitButton(submitButton) {
  submitButton.disabled = true;
};

/**
 * Активирует Submit Button
 * @param {HTMLElement} submitButton
 */
_enableSubmitButton(submitButton) {
  submitButton.disabled = false;
};

/**
 * Деактивирует Submit Button если хотя бы одно поле ввода не валидно
 * @param {array <HTMLElement>} inputs
 * @param {HTMLElement} submitButton
 */
_toggleButtonState(inputs, submitButton){
  const hasInvalidInput = inputs.some((formInput) => !this._isInputValid(formInput));

  if (hasInvalidInput) {
    this._disableSubmitButton(submitButton);
  } else {
    this._enableSubmitButton(submitButton);
  }
};

_setEventListeners (formElement){
  const inputs = Array.from(formElement.querySelectorAll(this._validationOptions.inputSelector));
  const submitButton = formElement.querySelector(this._validationOptions.submitButtonSelector);

  inputs.forEach((formInput) => {
    const errorElement = formElement.querySelector(this._getErrorElementClass(formInput.id));
    formInput.addEventListener('input', () => {
      if (this._isInputValid(formInput)){
        this._hideInputError(errorElement);
        this._unmarkInputError(formInput, this._validationOptions.inputErrorClass);
      } else {
        this._showInputError(errorElement, formInput.validationMessage);
        this._markInputError(formInput, this._validationOptions.inputErrorClass);
      }

      this._toggleButtonState(inputs, submitButton);
    });
  });
  formElement.addEventListener('reset', () => {
    this._disableSubmitButton(submitButton);
  } );
};
}

