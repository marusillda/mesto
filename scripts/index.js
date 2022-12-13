//Находим DOM-элементы
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const popupNameElement = document.querySelector('#profile_name');
const popupAboutElement = document.querySelector('#profile_about');
const popupForm = document.querySelector('.popup__form');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

/**
 * Обработчик закрытия Popup
 */
function handlePopupClose(){
  popup.classList.remove('popup_opened');
}

/**
 * Обработчик события Form Submit
 * @param {Event} event
 */
function handleFormSubmit(event){
  event.preventDefault();

  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;

  handlePopupClose();
}

/**
 * Обработчик открытия Popup с заполением Name и About со страницы
 */
function handlePopupOpen(){
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;

  popup.classList.add('popup_opened');
}

//Обработчики событий
popupForm.addEventListener('submit', handleFormSubmit);
popupCloseButton.addEventListener('click', handlePopupClose);
profileEditButton.addEventListener('click', handlePopupOpen);


