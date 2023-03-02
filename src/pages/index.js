import '../pages/index.css';

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
  popupAddFormName,
  popupEditFormName,
  popupFormSelector,
  popupFieldSelector
} from '../constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupPreview = new PopupWithImage({ popupSelector: popupPreviewSelector, popupImageSelector, popupNameSelector });
popupPreview.setEventListeners();

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

const popupEdit = new PopupWithForm({ popupSelector: popupEditSelector, popupFormSelector, popupFieldSelector }, (formValues) => {
  userInfo.setUserInfo(formValues);
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({ popupSelector: popupAddSelector, popupFormSelector, popupFieldSelector }, handleAddFormSubmit);
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
  const cardElement = createCard(formValues);
  initialCardList.addItem(cardElement, false);
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
const formValidators = {};
pageForms.forEach(formElement => {
  const validator = createFormValidator(formElement);
  const formName = formElement.getAttribute('name');

  formValidators[formName] = validator;
});

//Обработчики событий
profileEditButton.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
  //Очищает ошибки валидации
  formValidators[popupEditFormName].resetValidation();
});
profileAddButton.addEventListener('click', () => {
  popupAdd.open();
  formValidators[popupAddFormName].resetValidation();
});
