const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_type_error',
  submitButtonSelector: '.popup__submit-button'
};

//Находим DOM-элементы
const cardElementsSelector = '.elements';
const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__about';
const profileAvatarSelector = '.profile__avatar';
const popupImageSelector = '.popup__card-image';
const popupNameSelector = '.popup__card-name';
const popupPreviewSelector = '.popup_type_image';
const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_new-card';
const popupEditAvatarSelector = '.popup_type_edit-avatar';
const popupFormSelector = '.popup__form';
const popupFieldSelector = '.popup__field';
const popupAddFormName = 'addCardForm';
const popupEditFormName = 'editProfileForm';
const popupEditAvatarFormName = 'editAvatarForm';
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarElement = document.querySelector('.profile__avatar-overlay');
const pageForms = document.querySelectorAll(validationOptions.formSelector);
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-61';
const authorization = 'a1627f3c-6851-451f-acf3-d59a825ceb4e';

export {
  cardElementsSelector,
  validationOptions,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupEditSelector,
  popupAddSelector,
  profileEditButton,
  profileAddButton,
  profileAvatarElement,
  popupAddFormName,
  popupEditFormName,
  popupEditAvatarFormName,
  pageForms,
  popupPreviewSelector,
  popupImageSelector,
  popupNameSelector,
  popupFormSelector,
  popupFieldSelector,
  popupEditAvatarSelector,
  baseUrl,
  authorization
}
