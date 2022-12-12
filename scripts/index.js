const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const popupNameElement = document.querySelector('#profile_name');
const popupAboutElement = document.querySelector('#profile_about');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

const profileName = profileNameElement.textContent;
const profileAbout = profileAboutElement.textContent;

popupNameElement.value = profileName;
popupAboutElement.value = profileAbout;

function popupSubmitted(event){
  event.preventDefault();

  const newProfileName = popupNameElement.value;
  const newProfileAbout = popupAboutElement.value;

  profileNameElement.textContent = newProfileName;
  profileAboutElement.textContent = newProfileAbout;
}

function popupClosed(){
  popup.classList.remove('popup_opened');
}

function profileEdit(){
  popup.classList.add('popup_opened');
}

popupContainer.addEventListener('submit', popupSubmitted);
popupCloseButton.addEventListener('click', popupClosed);
profileEditButton.addEventListener('click', profileEdit);


