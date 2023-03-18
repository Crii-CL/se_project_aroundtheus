import "./index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});
/* ------------------------------ Card Elements ----------------------------- */
const cardListEl = document.querySelector(".cards__list");
/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const modalEditProfileForm = document.querySelector("#modal-profile-form");
const modalEditTitleInput = document.querySelector("#modal-edit-title-input");
const modalEditSubtitleInput = document.querySelector(
  "#modal-edit-subtitle-input"
);
/* -------------------------------- Add Card -------------------------------- */
const addCardModal = document.querySelector("#modal-add-card");
const modalAddCardForm = document.querySelector("#modal-add-card-form");
const profileAddCardBtn = document.querySelector("#profile-add-card-button");

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

function submitEditProfile(inputValues) {
  userInfoElement.setUserInfo({
    name: inputValues.title,
    description: inputValues.subtitle,
  });
}

function submitAddCard(inputValues) {
  renderCard({ name: inputValues.name, link: inputValues.link }, cardListEl);
  addFormPopup.close();
}

function openProfileEditForm() {
  const { name, description } = userInfoElement.getUserInfo();
  modalEditTitleInput.value = name;
  modalEditSubtitleInput.value = description;
  editFormPopup.open();
}

// function renderCard(cardData) {
//   const cardElement = new Card(
//     cardData,
//     "#card-template",
//     handleImageClick
//   ).renderCard();
//   cardListEl.prepend(cardElement);
// }

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

/* --------------------------------- Section.js -------------------------------- */
// const sectionElement = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   cardListEl
// );
// sectionElement.renderItems();
/* ---------------------------- FormValidator.js ---------------------------- */
const editFormValidator = new FormValidator(
  validationSettings,
  modalEditProfileForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  modalAddCardForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------- popups -------------------------------- */
const editFormPopup = new PopupWithForm(
  "#modal-edit-profile",
  submitEditProfile
);
const addFormPopup = new PopupWithForm("#modal-add-card", submitAddCard);
const imagePopup = new PopupWithImage({ popupSelector: "#modal-preview" });
const userInfoElement = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-subtitle",
});

api.getUserInfo().then((res) => console.log(res));
