import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
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

  // _submitConfirm() {
  //   super.setEventListeners();
  //   this._popupElement
  //     .querySelector("#confirm-del-form")
  //     .addEventListener("submit", (e) => {
  //       e.preventDefault();
  //       this._handleSubmitCallback();
  //     });
  // }

  // _removeEventListeners() {
  //   this._popupElement.removeEventListener("submit", (e) => {
  //     e.preventDefault();
  //     this._handleSubmitCallback();
  //   });
  // }
}
