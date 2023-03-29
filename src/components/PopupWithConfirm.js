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

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitCallback();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("#confirm-del-form")
      .addEventListener("submit", this._handleSubmit);
  }

  _removeEventListeners() {
    super.removeEventListeners();
    this._popupElement.removeEventListener("submit", this._handleSubmit);
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._buttonText;
  }
}
