import "./index.css";

import formValidator from "../components/formValidator.js";
import card from "../components/card.js";
import popup from "../components/popup.js";
import popupForm from "../components/popupWithForms.js";
import section from "../components/section.js";
import popupImage from "../components/popupWithImage.js";
import userInfo from "../components/userInfo.js";
import { initialCards, validationSettings } from "./constants.js";

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",a
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg",
//   },
// ];

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  cardPopup.open(addCardModal);
});

function submitEditProfile() {
  userInfoElement.setUserInfo({
    name: (profileTitle.textContent = modalEditTitleInput.value),
    job: (profileSubtitle.textContent = modalEditSubtitleInput.value),
  });
  editPopup.close(modalEditProfile);
}

function submitAddCard() {
  const name = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  cardPopup.close(addCardModal);
}

function openProfileEditForm() {
  userInfoElement.getUserInfo({
    name: (modalEditTitleInput.value = profileTitle.textContent),
    job: (modalEditSubtitleInput.value = profileSubtitle.textContent),
  });
  modalEditTitleInput;
  editPopup.open(modalEditProfile);
}

function renderCard(cardData) {
  const cardElement = new card(
    cardData,
    "#card-template",
    handleImageClick
  ).renderCard();
  cardListEl.prepend(cardElement);
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

/* --------------------------------- Section.js -------------------------------- */
const sectionElement = new section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);
sectionElement.renderItems();
/* ---------------------------- formValidator.js ---------------------------- */
// const validationSettings = {
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__form-button",
//   inactiveButtonClass: "modal__form-button_inactive",
//   inputErrorClass: "modal__form-input_error",
//   errorClass: "modal__error_visible",
// };

const editFormValidator = new formValidator(
  validationSettings,
  modalEditProfileForm
);
const addFormValidator = new formValidator(
  validationSettings,
  modalAddCardForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------- popups -------------------------------- */
const editPopup = new popup({ popupSelector: "#modal-edit-profile" });
const cardPopup = new popup({ popupSelector: "#modal-add-card" });
const imagePopup = new popupImage({ popupSelector: "#modal-preview" });

editPopup._setEventListeners();
cardPopup._setEventListeners();
imagePopup._setEventListeners();

const editFormPopup = new popupForm("#modal-edit-profile", submitEditProfile);
const addFormPopup = new popupForm("#modal-add-card", submitAddCard);

editFormPopup._setEventListeners();
addFormPopup._setEventListeners();

const userInfoElement = new userInfo({
  nameSelector: "#modal-edit-title-input",
  jobSelector: "#modal-edit-subtitle-input",
});

/* ------------------------------ Card Elements ----------------------------- */
const cardListEl = document.querySelector(".cards__list");

/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");

const modalEditProfile = document.querySelector("#modal-edit-profile");

const modalEditProfileForm = document.querySelector("#modal-profile-form");

const profileTitle = document.querySelector("#profile-title");

const profileSubtitle = document.querySelector("#profile-subtitle");

const modalEditTitleInput = document.querySelector("#modal-edit-title-input");

const modalEditSubtitleInput = document.querySelector(
  "#modal-edit-subtitle-input"
);

/* -------------------------------- Add Card -------------------------------- */
const addCardModal = document.querySelector("#modal-add-card");

const modalAddCardForm = document.querySelector("#modal-add-card-form");

const modalAddCardTitleInput = modalAddCardForm.querySelector(
  "#modal-add-card-title"
);

const modalAddCardLinkInput = modalAddCardForm.querySelector(
  "#modal-add-card-link"
);

const profileAddCardBtn = document.querySelector("#profile-add-card-button");

export { handleImageClick };
