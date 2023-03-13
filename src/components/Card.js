export default class Card {
  constructor({ data, userId, handleCardClick, handleApiLikeButtonClick, handleApiRemoveButtonClick }, templateSelector) {
    this._data = data;
    this._userId = userId;
    this._displayTrash = this._data.owner._id === this._userId,
    this._cardTemplate = document.querySelector(templateSelector).content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleApiLikeButtonClick = handleApiLikeButtonClick;
    this._handleApiRemoveButtonClick = handleApiRemoveButtonClick;
  }

  _isLiked(){
    return this._data.likes.some(like => like._id === this._userId);
  }

  /**
   * переключение состояния кнопки Like
   */
  _toggleLikeCard() {
    this._likeButton.classList.toggle('element__like-button-fill', this._isLiked());
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
   */
  _handleLikeButtonClick() {
    this._handleApiLikeButtonClick(this._data, this._isLiked())
      .then((card) => {
        this._data = card;
        this._toggleLikeCard();
        this._setLikeNumber();
      });
  }

  /**
   * Обработка события клика по кнопке Удалить карточку
   * @param {Event} event
   */
  _handleRemoveButtonClick(event) {
    this._handleApiRemoveButtonClick(this._data)
      .then(() => {
        const cardElement = event.target.closest('.element');
        this._removeCardElement(cardElement);
      });
  }

  _setEventListeners(cardElement, cardElementPhoto) {
    cardElement.querySelector('.element__like-button').addEventListener('click', () => { this._handleLikeButtonClick() });
    cardElementPhoto.addEventListener('click', () => { this._handleCardClick(this._data.name, this._data.link) });
    if (this._displayTrash) {
      cardElement.querySelector('.element__trash').addEventListener('click', (event) => { this._handleRemoveButtonClick(event) });
    }
  }

  /**
   * Создание карточки по шаблону
   * @returns {HTMLElement}
   */
  getCard() {
    const cardElement = this._cardTemplate.cloneNode(true);

    if (!this._displayTrash) {
      cardElement.querySelector('.element__trash').remove();
    }

    const cardElementPhoto = cardElement.querySelector('.element__photo');
    cardElementPhoto.src = this._data.link;
    cardElementPhoto.alt = this._data.name;
    cardElement.querySelector('.element__capture').textContent = this._data.name;
    this._likeNumber = cardElement.querySelector('.element__like-number');
    this._likeButton = cardElement.querySelector('.element__like-button');

    this._setLikeNumber();
    this._toggleLikeCard();
    this._setEventListeners(cardElement, cardElementPhoto);

    return cardElement;
  }

  _setLikeNumber() {
    this._likeNumber.textContent = this._data.likes.length;
  }

}
