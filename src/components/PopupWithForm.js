import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._popupForm.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  };

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
    // this._openEditAvatar.addEventListener("click", () => {
    //   this.open(this._popupForm);
    // });
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }
}

//set an event listener for the editavatar button
//make it open the edit avatar modal
