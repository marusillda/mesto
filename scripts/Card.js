export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = document.querySelector(templateSelector).content.querySelector('.element');
    this._handleCardClick = handleCardClick;
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

  _setEventListeners(cardElement, cardElementPhoto) {
    cardElement.querySelector('.element__like').addEventListener('click', (event) => { this._handleLikeButtonClick(event) });
    cardElement.querySelector('.element__trash').addEventListener('click', (event) => { this._handleRemoveButtonClick(event) });
    cardElementPhoto.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
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

    this._setEventListeners(cardElement, cardElementPhoto);

    return cardElement;
  }

}
