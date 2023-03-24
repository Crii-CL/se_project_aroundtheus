import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  setSubmitAction = (action) => {
    this._handleSubmitCallback = action;
  };

  setEventListeners() {
    this._popupElement
      .querySelector("#confirm-del-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleSubmitCallback();
      });
  }
}
//create a method that will allow you to set a callback function that will be called
//when the form is submitted, you'll call that method inside of handleDelClick
