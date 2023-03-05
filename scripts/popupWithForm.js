import Popup from "./popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._popupForm.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
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
    const closeBtn = document.querySelector(".modal__close");

    closeBtn.addEventListener("click", () => {
      console.log(this._closeBtn);
      super.close();
    });
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
