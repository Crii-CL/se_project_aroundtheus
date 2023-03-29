import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super({ popupSelector });
    this._loadingButtonText = loadingButtonText;
    this._submitBtn = this._popupElement.querySelector(".modal__form-button");
    this._buttonText = this._submitBtn.textContent;
  }

  setSubmitAction = (action) => {
    this._handleSubmitCallback = action;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("#confirm-del-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleSubmitCallback();
      });
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingButtonText;
    console.log("Hello");
    console.log(this._submitBtn);
    console.log(this._loadingButtonText);
  }

  hideLoading() {
    this._submitBtn.textContent = this._buttonText;
  }
}
