import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, popupConfirmButtonSelector }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(popupConfirmButtonSelector);
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this.close();
      this._handleButtonClick();
    });
    super.setEventListeners();
  }

  /**
   * Задает действие, которое должно быть выполнено после подтверждения пользователем
   * @param {Function} handleButtonClick
   */
  setButtonClickAction(handleButtonClick){
    this._handleButtonClick = handleButtonClick;
  }
}
