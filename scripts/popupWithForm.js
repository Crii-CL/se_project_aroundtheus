import Popup from "./popup.js";
import Card from "./card.js";

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
    this._getInputValues();
    super.close();
  }
}
const editProfileForm = new PopupForm("#modal-edit-profile", (e) => {
  e.preventDefault();
});

const addCardForm = new PopupForm("#modal-add-card", (e) => {
  e.preventDefault();
});

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = modalEditTitleInput.value;
//   profileSubtitle.textContent = modalEditSubtitleInput.value;
//   handlePopup.close(modalEditProfile);
// }

// function handleProfileAddCardSubmit(e) {
//   e.preventDefault();
//   const name = modalAddCardTitleInput.value;
//   const link = modalAddCardLinkInput.value;
//   renderCard({ name, link }, cardListEl);
//   handlePopup.close(addCardModal);
//   e.target.reset();
// }
