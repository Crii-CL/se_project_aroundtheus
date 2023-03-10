import "./index.css";

import formValidator from "../components/formValidator.js";
import card from "../components/card.js";
import popup from "../components/popup.js";
import popupForm from "../components/popupWithForms.js";
import section from "../components/section.js";
import popupImage from "../components/popupWithImage.js";
import userInfo from "../components/userInfo.js";
import { initialCards, validationSettings } from "../components/constants.js";

/* ------------------------------ Card Elements ----------------------------- */
const cardListEl = document.querySelector(".cards__list");
/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
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

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

function submitEditProfile() {
  userInfoElement.setUserInfo({
    name: (profileTitle.textContent = modalEditTitleInput.value),
    job: (profileSubtitle.textContent = modalEditSubtitleInput.value),
  });
  editFormPopup.close();
}

function submitAddCard() {
  const name = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  addFormPopup.close();
}

function openProfileEditForm() {
  userInfoElement.getUserInfo({
    name: (modalEditTitleInput.value = profileTitle.textContent),
    job: (modalEditSubtitleInput.value = profileSubtitle.textContent),
  });
  // const { name, job } = userInfo.getUserInfo();
  // modalEditTitleInput.value = name;
  // modalEditSubtitleInput.value = job;
  editFormPopup.open();
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
const editFormPopup = new popupForm("#modal-edit-profile", submitEditProfile);
const addFormPopup = new popupForm("#modal-add-card", submitAddCard);
const imagePopup = new popupImage({ popupSelector: "#modal-preview" });

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

const userInfoElement = new userInfo({
  nameSelector: "#modal-edit-title-input",
  jobSelector: "#modal-edit-subtitle-input",
});
