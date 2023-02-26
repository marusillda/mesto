const initialCards = [
  {
    name: 'Эсто-Садок',
    link: './images/element-esto.jpg'
  },
  {
    name: 'Побережье Анапы',
    link: './images/element-anapa.jpg'
  },
  {
    name: 'Абрау Дюрсо',
    link: './images/element-abrau.jpg'
  },
  {
    name: 'Красная Поляна',
    link: './images/element-mountain.jpg'
  },
  {
    name: 'Морской вокзал Сочи',
    link: './images/element-sochi.jpg'
  },
  {
    name: 'Роза Хутор',
    link: './images/element-rosa-hutor.jpg'
  }
];

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
const popupImageSelector = '.popup__card-image';
const popupNameSelector = '.popup__card-name';
const popupPreviewSelector = '.popup_type_image';
const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_new-card';
const popupFormSelector = '.popup__form';
const popupFieldSelector = '.popup__field';
const popupEditFormName = 'editProfileForm';
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const pageForms = document.querySelectorAll(validationOptions.formSelector);

export {
  cardElementsSelector,
  initialCards,
  validationOptions,
  profileNameSelector,
  profileAboutSelector,
  popupEditSelector,
  popupAddSelector,
  profileEditButton,
  profileAddButton,
  popupEditFormName,
  pageForms,
  popupPreviewSelector,
  popupImageSelector,
  popupNameSelector,
  popupFormSelector,
  popupFieldSelector
}
