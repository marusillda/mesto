import {
  cardElementsSelector,
  profileNameSelector,
  profileAboutSelector,
  popupEditSelector,
  popupAddSelector,
  initialCards,
  validationOptions,
  profileEditButton,
  profileAddButton,
  pageForms,
  popupPreviewSelector,
  popupImageSelector,
  popupNameSelector,
  popupEditFormName,
  popupFormSelector,
  popupFieldSelector
} from './constants.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const popupPreview = new PopupWithImage({popupSelector: popupPreviewSelector, popupImageSelector, popupNameSelector});
popupPreview.setEventListeners();

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

const popupEdit = new PopupWithForm({popupSelector: popupEditSelector, popupFormSelector, popupFieldSelector}, (formValues) => {
  userInfo.setUserInfo(formValues);
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({popupSelector: popupAddSelector, popupFormSelector, popupFieldSelector}, handleAddFormSubmit);
popupAdd.setEventListeners();

/**
 *
 * @param {{name: string, link: string}} item
 */
function createCard(item) {
  const card = new Card(item.name, item.link, '#card', popupPreview.open.bind(popupPreview));
  const cardElement = card.getCard();
  return cardElement;
}

/**
 * Загрузка начальных карточек из массива
 */
const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    initialCardList.addItem(cardElement);
  }
}, cardElementsSelector);

initialCardList.renderItems();

/**
 * Обработчик события Add Form Submit
 * @param {object} formValues
 */
function handleAddFormSubmit(formValues) {
  const newCard = new Section({
    items: [formValues],
    renderer: (item) => {
      const cardElement = createCard(item);
      newCard.addItem(cardElement, false);
    }
  }, cardElementsSelector);
  newCard.renderItems();
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
  if (formElement.attributes.name.value === popupEditFormName) {
    popupEditFormValidator = validator;
  }
});


//Обработчики событий
profileEditButton.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
  //Очищает ошибки валидации
  popupEditFormValidator.resetValidation();
});
profileAddButton.addEventListener('click', () => {popupAdd.open();});
