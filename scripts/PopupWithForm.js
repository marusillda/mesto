import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, popupFormSelector, popupFieldSelector}, handleSubmitForm){
    super(popupSelector);
    this._formElement = this._popup.querySelector(popupFormSelector);
    this._inputList = this._formElement.querySelectorAll(popupFieldSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners(){
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  open(formValues){
    if (formValues){
      this._setInputValues(formValues);
    }
    super.open();
  }

  close(){
     this._formElement.reset();
     super.close();
  }

  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  _setInputValues(formValues){
    this._inputList.forEach(input => {
      input.value = formValues[input.name];
    });
  }
}
