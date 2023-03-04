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
    this._profileTitle = this._popupForm.querySelector("#profile-title");
    this._profileSubtitle = this._popupForm.querySelector("#profile-subtitle");
    this._cardTitle = this._popupForm.querySelector("#modal-add-card-title");
    this._cardLink = this._popupForm.querySelector("#modal-add-card-link");
    this._profileTitleInput = this._popupForm.querySelector(
      "#modal-edit-title-input"
    );
    this._profileSubtitleInput = this._popupForm.querySelector(
      "#modal-edit-subtitle-input"
    );
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const addCardForm = new PopupForm("#modal-add-card", (e) => {
  e.preventDefault();
  const name = this._cardTitle.value;
  const link = this._cardLink.value;
  const cardListEl = document.querySelector(".cards__list");
  renderCard({ name, link }, cardListEl);
  addCardForm.close();
  addCardForm.reset();
});

const editProfileForm = new PopupForm("#modal-edit-profile", (e) => {
  e.preventDefault();
  editProfileForm._profileTitle.textContent =
    editProfileForm._profileTitleInput.value;

  editProfileForm._profileSubtitle.textContent =
    editProfileForm._profileSubtitleInput.value;
  editProfileForm.close();
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
