import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({popupSelector, popupImageSelector, popupNameSelector}) {
    super(popupSelector);
    this._popupPreviewImage = this._popup.querySelector(popupImageSelector);
    this._popupPreviewName = this._popup.querySelector(popupNameSelector);
  }

  /**
   * Обработчик клика по карточке
   * @param {String} name
   * @param {String} link
  */
  open(name, link) {
    this._popupPreviewImage.src = link;
    this._popupPreviewImage.alt = name;
    this._popupPreviewName.textContent = name;
    super.open();
  }
}

