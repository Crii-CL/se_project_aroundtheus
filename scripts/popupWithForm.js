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
    this._closeBtn = document.querySelector(".modal__close");

    this._closeBtn.addEventListener("click", () => {
      super.close();
    });

    document
      .querySelector("#modal-add-card")
      .addEventListener("submit", () => {});
    document
      .querySelector("#modal-edit-profile")
      .addEventListener("submit", () => {});
  }
}
