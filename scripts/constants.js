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
const cardElements = document.querySelector('.elements');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const editFormNameElement = document.querySelector('#profile-name');
const editFormAboutElement = document.querySelector('#profile-about');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAddForm = popupNewCard.querySelector('.popup__form');
const popupAddFormSubmitButton = popupAddForm.querySelector(validationOptions.submitButtonSelector);
const addFormNameElement = document.querySelector('#card-name');
const addFormLinkElement = document.querySelector('#card-link');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditForm = popupEdit.querySelector('.popup__form');
const pageForms = document.querySelectorAll(validationOptions.formSelector);
const popupPreview = document.querySelector('.popup_type_image');
const popupPreviewImage = popupPreview.querySelector('.popup__card-image');
const popupPreviewName = popupPreview.querySelector('.popup__card-name');

export {
  cardElements,
  initialCards,
  validationOptions,
  profileNameElement,
  profileAboutElement,
  editFormNameElement,
  editFormAboutElement,
  popupEdit,
  popupAddForm,
  popupNewCard,
  popupAddFormSubmitButton,
  addFormNameElement,
  addFormLinkElement,
  popupCloseButtons,
  profileEditButton,
  profileAddButton,
  popupEditForm,
  pageForms,
  popupPreview,
  popupPreviewImage,
  popupPreviewName
}
