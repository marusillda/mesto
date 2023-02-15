import {
  cardElements,
  profileNameElement,
  profileAboutElement,
  editFormNameElement,
  editFormAboutElement,
  popupEdit,
  popupAddForm,
  popupNewCard
} from './constants.js';

/**
 * Добавляет карточку в DOM в конец
 * @param {HTMLElement} cardElement
 */
export function appendCard(cardElement) {
  cardElements.append(cardElement);
}

/**
 * Добавляет карточку в DOM в начало
 * @param {HTMLElement} cardElement
 */
export function prependCard(cardElement) {
  cardElements.prepend(cardElement);
}

/**
 * Закрытие Popup
 * @param {HTMLElement} popup
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscDown);
}

/**
 * Ищет открытый попап
 * @returns
 */
export function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

/**
 * Обработчик нажатия клавиши Escape
 * @param {Event} event
 */
export function handleEscDown(event) {
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
export function handleOverlayClick(event) {
  const popup = findOpenedPopup();

  if (popup === event.target) {
    closePopup(popup);
  }
}

/**
 * Открытие Popup
 * @param {HTMLElement} popup
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscDown);
}

/**
 * Обработчик закрытия Popup по кнопке
 */
export function handlePopupButtonClose(event) {
  const popup = event.target.closest('.popup');
  closePopup(popup);
}

/**
 * Обработчки открытия Popup с редактированием имени профиля и профессии
 */
export function handlePopupEditOpen(popupEditFormValidator) {
  editFormNameElement.value = profileNameElement.textContent;
  editFormAboutElement.value = profileAboutElement.textContent;
  //Очищает ошибки валидации
  popupEditFormValidator.resetValidation();
  openPopup(popupEdit);
}

/**
 * Обработчки открытия Popup добавления карточки
 */
export function handlePopupAddOpen() {
  popupAddForm.reset();
  openPopup(popupNewCard);
}

/**
 * Обработчик события Form Submit
 * @param {Event} event
 */
export function handleEditFormSubmit(event) {
  event.preventDefault();

  profileNameElement.textContent = editFormNameElement.value;
  profileAboutElement.textContent = editFormAboutElement.value;

  closePopup(popupEdit);
}

