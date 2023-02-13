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
  pageForms
} from './constants.js';
import {
  appendCard,
  handleEditFormSubmit,
  handlePopupButtonClose,
  handlePopupEditOpen,
  handlePopupAddOpen,
  prependCard,
  closePopup
} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/**
 * Загрузка начальных карточек из массива
 */
function loadInitialCards() {
  initialCards.forEach(function (initialCard) {
    const card = new Card (initialCard.name, initialCard.link, '#card');
    const cardElement = card.getCard();
    appendCard(cardElement);
  });
}

/**
 * Обработчик события Add Form Submit
 * @param {Event} event
 */
function handleAddFormSubmit(event) {
  event.preventDefault();
  const newCard = new Card(addFormNameElement.value, addFormLinkElement.value, '#card');
  const cardElement = newCard.getCard();
  prependCard(cardElement);
  closePopup(popupNewCard);
}

//Обработчики событий
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
popupCloseButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', handlePopupButtonClose);
});
profileEditButton.addEventListener('click', handlePopupEditOpen);
profileAddButton.addEventListener('click', handlePopupAddOpen);

loadInitialCards();

//Включение валидации форм
pageForms.forEach((formElement) => {
  const formValidator = new FormValidator(validationOptions, formElement);
  formValidator.enableValidation();
});
