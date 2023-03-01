import esto from '../images/element-esto.jpg';
import anapa from '../images/element-anapa.jpg';
import abrau from '../images/element-abrau.jpg';
import mountain from '../images/element-mountain.jpg';
import sochi from '../images/element-sochi.jpg';
import rosa_hutor from '../images/element-rosa-hutor.jpg';

const initialCards = [
  {
    name: 'Эсто-Садок',
    link: esto
  },
  {
    name: 'Побережье Анапы',
    link: anapa
  },
  {
    name: 'Абрау Дюрсо',
    link: abrau
  },
  {
    name: 'Красная Поляна',
    link: mountain
  },
  {
    name: 'Морской вокзал Сочи',
    link: sochi
  },
  {
    name: 'Роза Хутор',
    link: rosa_hutor
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
