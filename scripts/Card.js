import {openPopup} from './utils.js';

export default class Card {
    constructor(name, link, templateSelector){
      this._name = name;
      this._link = link;
      this._cardTemplate = document.querySelector(templateSelector).content.querySelector('.element');
      this._popupPreview = document.querySelector('.popup_type_image');
      this._popupPreviewImage = this._popupPreview.querySelector('.popup__card-image');
      this._popupPreviewName = this._popupPreview.querySelector('.popup__card-name');
    }

/**
 * переключение состояния кнопки Like
 * @param {HTMLElement} likeButton
 */
_toggleLikeCard(likeButton) {
  likeButton.classList.toggle('element__like-fill');
}

/**
 * Удаление карточки из DOM
 * @param {HTMLElement} cardElement
 */
_removeCardElement(cardElement) {
  cardElement.remove();
}

/**
 * Обработка события клика по кнопке Like
 * @param {Event} event
 */
_handleLikeButtonClick(event) {
  this._toggleLikeCard(event.target);
}

/**
 * Обработка события клика по кнопке Удалить карточку
 * @param {Event} event
 */
_handleRemoveButtonClick(event) {
  const cardElement = event.target.closest('.element');
  this._removeCardElement(cardElement);
}

/**
 * Создание карточки по шаблону
 * @returns {HTMLElement}
 */
getCard() {
  const cardElement = this._cardTemplate.cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.element__photo');

  cardElementPhoto.src = this._link;
  cardElementPhoto.alt = this._name;
  cardElement.querySelector('.element__capture').textContent = this._name;
  cardElement.querySelector('.element__like').addEventListener('click', (event) => {this._handleLikeButtonClick(event)});
  cardElement.querySelector('.element__trash').addEventListener('click', (event) => {this._handleRemoveButtonClick(event)});
  cardElementPhoto.addEventListener('click', () => {
    this._popupPreviewImage.src = this._link;
    this._popupPreviewImage.alt = this._name;
    this._popupPreviewName.textContent = this._name;
    openPopup(this._popupPreview);
  });

  return cardElement;
}

}
