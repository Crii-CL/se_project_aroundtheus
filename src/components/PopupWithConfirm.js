import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super({ popupSelector });
    this._loadingButtonText = loadingButtonText;
    this._submitBtn = this._popupElement.querySelector(".modal__form-button");
    this._buttonText = this._submitBtn.textContent;
  }

  setSubmitAction = (action) => {
    this._handleSubmitCallback = (e) => {
      e.preventDefault();
      action();
    };
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("#confirm-del-form")
      .addEventListener("submit", this._handleSubmitCallback);
    console.log("seteventlisteners in confirm popup");
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener(
      "submit",
      this._handleSubmitCallback
    );
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._buttonText;
  }

  close() {
    super.close();
    this._removeEventListeners();
  }
}
