import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  handleSubmit = (action) => {
    action.preventDefault();
    this._handleSubmitCallback = action;
  };

  _setEventListeners() {
    this._delSubmitBtn.addEventListener("click", this.handleSubmit);
  }
}
//create a method that will allow you to set a callback function that will be called
//when the form is submitted, you'll call that method inside of handleDelClick
