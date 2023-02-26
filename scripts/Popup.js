export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  /**
   * Открытие Popup
   */
  open(){
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handleOverlayClick.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  /**
   * Закрытие Popup
   */
  close(){
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleOverlayClick.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners(){
    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  /**
   * Обработчик клика по Overlay
   * @param {*} event
   */
  _handleOverlayClick(event){
    if (this._popup === event.target) {
      this.close();
    }
  }

 /**
  * Обработчик нажатия клавиши Escape
  * @param {*} event
  */
  _handleEscClose(event){
    if (event.key === 'Escape') {
      event.preventDefault();

      this.close();
    }
  }


}
