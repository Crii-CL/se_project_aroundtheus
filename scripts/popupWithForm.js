import Popup from "./popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._popupForm.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
    this._closeBtn = this._popupElement.querySelector(".modal__close");
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    console.log(inputValues);
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _setEventListeners() {
    this._closeBtn.addEventListener("click", () => {
      this.close();
    });

    this._handleFormSubmit.addEventListener("submit", (e) => {
      e.preventDefault();
      this.close();
    });
  }
}
