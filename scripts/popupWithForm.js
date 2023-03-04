import Popup from "./popup.js";
import {
  modalAddCardTitleInput,
  modalAddCardLinkInput,
  profileTitle,
  profileSubtitle,
  modalEditTitleInput,
  modalEditSubtitleInput,
} from "./index.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._profileTitle = document.querySelector("#profile-title");
    this._profileSubtitle = document.querySelector("#profile-subtitle");
    this._cardTitle = document.querySelector("#modal-add-card-title");
    this._cardLink = document.querySelector("#modal-add-card-link");
    //should I use this._popupForm instead of document?
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const addCardForm = new PopupForm("#modal-add-card", (e) => {
  e.preventDefault();
  const name = this._modalAddCardTitleInput.value;
  const link = this._modalAddCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  this._popupForm.close();
  this._popupForm.reset();
});

const editProfileForm = new PopupForm("#modal-edit-profile", (e) => {
  e.preventDefault();
  this._profileTitle.textContent = this._modalEditTitleInput.value;
  this._profileSubtitle.textContent = this._modalEditSubtitleInput.value;
  this.close(modalEditProfile);
});

addCardForm.close();
editProfileForm.close();

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
