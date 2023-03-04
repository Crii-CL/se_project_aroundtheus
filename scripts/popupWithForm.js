import Popup from "./popup.js";

class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const newPopupForm = new PopupForm(".modal", () => {
  //handleFormSubmit code
});
newPopupForm.open();
newPopupForm.close();
