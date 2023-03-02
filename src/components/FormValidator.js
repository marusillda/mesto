export default class FormValidator {
  /**
   *
   * @param {{
   *   inputSelector: string,
   *   inputErrorClass: string,
   *   submitButtonSelector: string
   * }} validationOptions
   * @param {HTMLElement} formElement
  */
  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
  }

  /**
   * Сбрасывает ошибки валидации
   */
  resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((formInput) => {
      const errorElement = this._formElement.querySelector(this._getErrorElementClass(formInput.id));
      this._hideInputError(errorElement);
      this._unmarkInputError(formInput, this._validationOptions.inputErrorClass);
    });
  };

  /**
   * Включает живую валидацию
   */
  enableValidation() {
    this._setEventListeners();
  }

  /**
   * Проверяет валидность поля ввода
   * @param {HTMLElement} formInput
   * @returns {boolean}
   */
  _isInputValid = (formInput) => formInput.validity.valid;

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
   */
  _disableSubmitButton() {
    this._submitButton.disabled = true;
  };

  /**
   * Активирует Submit Button
   */
  _enableSubmitButton() {
    this._submitButton.disabled = false;
  };

  /**
   * Деактивирует Submit Button если хотя бы одно поле ввода не валидно
   */
  _toggleButtonState() {
    const hasInvalidInput = this._inputs.some((formInput) => !this._isInputValid(formInput));

    if (hasInvalidInput) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  /**
   * Устанавлиает слушатели событий для живой валидации
   */
  _setEventListeners() {
    this._inputs.forEach((formInput) => {
      const errorElement = this._formElement.querySelector(this._getErrorElementClass(formInput.id));
      formInput.addEventListener('input', () => {
        if (this._isInputValid(formInput)) {
          this._hideInputError(errorElement);
          this._unmarkInputError(formInput, this._validationOptions.inputErrorClass);
        } else {
          this._showInputError(errorElement, formInput.validationMessage);
          this._markInputError(formInput, this._validationOptions.inputErrorClass);
        }

        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('reset', () => {
      this.resetValidation();
    });
  };
}

