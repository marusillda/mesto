const showInputError = (errorElement, errorMessage) => {
  errorElement.textContent = errorMessage;
};

const hideInputError = (errorElement) => {
  errorElement.textContent = '';
};

const isInputValid = (formInput) => formInput.validity.valid;

const disableSubmitButton = (submitButton) => {
  submitButton.disabled = true;
};

const enableSubmitButton = (submitButton) => {
  submitButton.disabled = false;
};

const toggleButtonState = (inputList, submitButton) => {
  const hasInvalidInput = inputList.some((formInput) => !isInputValid(formInput));

  if (hasInvalidInput) {
    disableSubmitButton(submitButton);
  } else {
    enableSubmitButton(submitButton);
  }
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = document.querySelectorAll(formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

const setEventListeners = (formElement, { inputSelector, errorClassSuffix, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputList.forEach((formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}${errorClassSuffix}`);
    formInput.addEventListener('input', () => {
      if (isInputValid(formInput)){
        hideInputError(errorElement);
      } else {
        showInputError(errorElement, formInput.validationMessage);
      }

      toggleButtonState(inputList, submitButton);
    });
  });
};

