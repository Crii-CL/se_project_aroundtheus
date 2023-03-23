class PopupWithConfirm extends Popup {
  _handleSubmit = (e) => {
    e.preventDefault();
    this.close();
  };

  _setEventListeners() {
    this._delSubmitBtn.addEventListener("click", this._handleSubmit);
  }
}
//create a method that will allow you to set a callback function that will be called
//when the form is submitted, you'll call that method inside of handleDelClick
