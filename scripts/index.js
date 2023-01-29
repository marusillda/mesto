//Находим DOM-элементы
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const editFormNameElement = document.querySelector('#profile_name');
const editFormAboutElement = document.querySelector('#profile_about');
const addFormNameElement = document.querySelector('#card_name');
const addFormLinkElement = document.querySelector('#card_link');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupPreview = document.querySelector('.popup_type_image');
const popupPreviewImage = popupPreview.querySelector('.popup__card-image');
const popupPreviewName = popupPreview.querySelector('.popup__card-name');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupNewCard.querySelector('.popup__form');
const popupAddFormSubmitButton = popupAddForm.querySelector(validationOptions.submitButtonSelector);
const cardTemplate = document.querySelector('#card').content.querySelector('.element');
const cardElements = document.querySelector('.elements');

/**
 * переключение состояния кнопки Like
 * @param {HTMLElement} likeButton
 */
function toggleLikeCard(likeButton) {
  likeButton.classList.toggle('element__like-fill');
}

/**
 * Удаление карточки из DOM
 * @param {HTMLElement} cardElement
 */
function removeCardElement(cardElement) {
  cardElement.remove();
}

/**
 * Обработка события клика по кнопке Like
 * @param {Event} event
 */
function handleLikeButtonClick(event) {
  toggleLikeCard(event.target);
}

/**
 * Обработка события клика по кнопке Удалить карточку
 * @param {Event} event
 */
function handleRemoveButtonClick(event) {
  const cardElement = event.target.closest('.element');
  removeCardElement(cardElement);
}

/**
 * Создание карточки по шаблону
 * @param {Object} card Объект с полями name  и  link
 * @returns {HTMLElement}
 */
function getCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.element__photo');

  cardElementPhoto.src = card.link;
  cardElementPhoto.alt = card.name;
  cardElement.querySelector('.element__capture').textContent = card.name;
  cardElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
  cardElement.querySelector('.element__trash').addEventListener('click', handleRemoveButtonClick);
  cardElementPhoto.addEventListener('click', () => {
    popupPreviewImage.src = card.link;
    popupPreviewImage.alt = card.name;
    popupPreviewName.textContent = card.name;
    openPopup(popupPreview);
  });

  return cardElement;
}

/**
 * Добавляет карточку в DOM в конец
 * @param {HTMLElement} cardElement
 */
function appendCard(cardElement) {
  cardElements.append(cardElement);
}

/**
 * Добавляет карточку в DOM в начало
 * @param {HTMLElement} cardElement
 */
function prependCard(cardElement) {
  cardElements.prepend(cardElement);
}

/**
 * Загрузка начальных карточек их массива
 */
function loadInitialCards() {
  initialCards.forEach(function (card) {
    const cardElement = getCard(card);
    appendCard(cardElement);
  });
}

/**
 * Закрытие Popup
 * @param {HTMLElement} popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscDown);
}

/**
 * Обработчик события Form Submit
 * @param {Event} event
 */
function handleEditFormSubmit(event) {
  event.preventDefault();

  profileNameElement.textContent = editFormNameElement.value;
  profileAboutElement.textContent = editFormAboutElement.value;

  closePopup(popupEdit);
}

/**
 * Обработчик события Add Form Submit
 * @param {Event} event
 */
function handleAddFormSubmit(event) {
  event.preventDefault();
  const newCard = {
    name: addFormNameElement.value,
    link: addFormLinkElement.value
  };
  const cardElement = getCard(newCard);
  prependCard(cardElement);
  closePopup(popupNewCard);
}

/**
 * Ищет открытый попап
 * @returns
 */
function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

/**
 * Обработчик нажатия клавиши Escape
 * @param {Event} event
 */
function handleEscDown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    const popup = findOpenedPopup();

    closePopup(popup);
  }
}

/**
 * Обработчик клика по Overlay
 * @param {Event} event
 */
function handleOverlayClick(event) {
  const popup = findOpenedPopup();

  if (popup === event.target) {
    closePopup(popup);
  }
}

/**
 * Открытие Popup
 * @param {HTMLElement} popup
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscDown);
}

/**
 * Обработчик закрытия Popup по кнопке
 */
function handlePopupButtonClose(event) {
  const popup = event.target.closest('.popup');
  closePopup(popup);
}

/**
 * Обработчки открытия Popup с редактированием имени профиля и профессии
 */
function handlePopupEditOpen() {
  editFormNameElement.value = profileNameElement.textContent;
  editFormAboutElement.value = profileAboutElement.textContent;

  openPopup(popupEdit);
}

/**
 * Обработчки открытия Popup добавления карточки
 */
function handlePopupAddOpen() {
  popupAddForm.reset();
  disableSubmitButton(popupAddFormSubmitButton);
  openPopup(popupNewCard);
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

enableValidation(validationOptions);
