import {
  initialCards,
  validationOptions,
  popupEditForm,
  popupAddForm,
  popupCloseButtons,
  profileEditButton,
  profileAddButton,
  addFormNameElement,
  addFormLinkElement,
  popupNewCard,
  pageForms,
  popupPreview,
  popupPreviewImage,
  popupPreviewName
} from './constants.js';
import {
  appendCard,
  handleEditFormSubmit,
  handlePopupButtonClose,
  handlePopupEditOpen,
  handlePopupAddOpen,
  prependCard,
  closePopup,
  openPopup
} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/**
 *
 * @param {{name: string, link: string}} item
 */
function createCard(item) {
  const card = new Card(item.name, item.link, '#card', handleCardClick);
  const cardElement = card.getCard();
  return cardElement;
}

/**
 * Загрузка начальных карточек из массива
 */
function loadInitialCards() {
  initialCards.forEach(function (initialCard) {
    const cardElement = createCard(initialCard);
    appendCard(cardElement);
  });
}

/**
 * Обработчик события Add Form Submit
 * @param {Event} event
 */
function handleAddFormSubmit(event) {
  event.preventDefault();
  const name = addFormNameElement.value;
  const link = addFormLinkElement.value;
  const cardElement = createCard({ name, link });
  prependCard(cardElement);
  closePopup(popupNewCard);
}

/**
 * Обработчик клика по карточке
 * @param {String} name
 * @param {String} link
 */
function handleCardClick(name, link) {
  popupPreviewImage.src = link;
  popupPreviewImage.alt = name;
  popupPreviewName.textContent = name;
  openPopup(popupPreview);
}

/**
 * Создает FormValidator и включает живую валидацию
 * @param {HTMLElement} formElement
 */
function createFormValidator(formElement) {
  const validator = new FormValidator(validationOptions, formElement);
  validator.enableValidation();

  return validator;
}

//Создает валидатор для каждой формы на странице и запоминаем валидатор для popupEditForm
let popupEditFormValidator;
pageForms.forEach(formElement => {
  const validator = createFormValidator(formElement);
  if (formElement.name === popupEditForm.name) {
    popupEditFormValidator = validator;
  }
});

//Обработчики событий
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
popupCloseButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', handlePopupButtonClose);
});
profileEditButton.addEventListener('click', () => {
  handlePopupEditOpen(popupEditFormValidator);
});
profileAddButton.addEventListener('click', handlePopupAddOpen);

loadInitialCards();
