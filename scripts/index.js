import formValidator from "./formValidator.js";
import Card from "./card.js";
// import { openPopup, closePopup } from "./utils.js";
import Popup from "./popup.js";
import PopupForm from "./popupWithForm.js";
import Section from "./section.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/* ------------------------------ Card Elements ----------------------------- */
const cardListEl = document.querySelector(".cards__list");

const closeButtons = document.querySelectorAll(".modal__close");

const modalPreview = document.querySelector(".modalPreview");

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

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  // openPopup(addCardModal);
  cardPopup.open(addCardModal);
});

// modalEditProfileForm.addEventListener("submit", submitEditProfile);

// modalAddCardForm.addEventListener("submit", submitAddCard);

// function submitEditProfile(e) {
//   e.preventDefault();
//   profileTitle.textContent = modalEditTitleInput.value;
//   profileSubtitle.textContent = modalEditSubtitleInput.value;
//   editPopup.close(modalEditProfile);
// }

// function submitAddCard(e) {
//   e.preventDefault();
//   const name = modalAddCardTitleInput.value;
//   const link = modalAddCardLinkInput.value;
//   renderCard({ name, link }, cardListEl);
//   editPopup.close(addCardModal);
//   e.target.reset();
// }

function submitEditProfile(e) {
  e.preventDefault();
  profileTitle.textContent = modalEditTitleInput.value;
  profileSubtitle.textContent = modalEditSubtitleInput.value;
  editPopup.close(modalEditProfile);
}

function submitAddCard(e) {
  e.preventDefault();
  const name = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  editPopup.close(addCardModal);
  e.target.reset();
}

//this is the old function
// function handleImagePreview(cardData) {
//   modalPreviewImage.src = cardData.link;
//   modalPreviewImage.alt = cardData.name;
//   modalPreviewTitle.textContent = cardData.name;
// }

// function handlePreview() {
//   document.querySelector("#modal-preview-image").src = this._link;
//   document.querySelector("#modal-preview-image").alt = "Photo of ${this._name}";
//   document.querySelector("#modal-preview-title").textContent = this._name;
// }

function openProfileEditForm() {
  modalEditTitleInput.value = profileTitle.textContent;
  modalEditSubtitleInput.value = profileSubtitle.textContent;
  editPopup.open(modalEditProfile);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const cardLikeBtn = cardElement.querySelector(".card__like-button");
//   const cardDelBtn = cardElement.querySelector(".card__delete-button");
//   cardDelBtn.addEventListener("click", handleDelCard);
//   cardLikeBtn.addEventListener("click", handleLikeButton);
//   cardImageEl.addEventListener("click", () => {
//     handleImagePreview(cardData);
//     openPopup(modalPreview);
//   });
//   cardImageEl.alt = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template").renderCard();
  cardListEl.prepend(card);

  // const cardElement = getCardElement(cardData);
  // cardListEl.prepend(cardElement);
}

function handleImageClick() {
  imagePopup.open(modalPreview);
}

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   // const popup = button.closest(".modal");
//   button.addEventListener("click", () => {
//     editPopup.close();
//     cardPopup.close();
//     imagePopup.close();
//   });
// });
/* --------------------------------- Section.js -------------------------------- */
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);
section.renderItems();
/* ---------------------------- formValidator.js ---------------------------- */
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

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
const editPopup = new Popup({ popupSelector: "#modal-edit-profile" });
const cardPopup = new Popup({ popupSelector: "#modal-add-card" });
const imagePopup = new Popup({ popupSelector: "#modal-preview" });

editPopup._setEventListeners();
cardPopup._setEventListeners();
imagePopup._setEventListeners();

const editFormPopup = new PopupForm("#modal-edit-profile", submitEditProfile);
const addFormPopup = new PopupForm("#modal-add-card", submitAddCard);

editFormPopup._setEventListeners();
addFormPopup._setEventListeners();

export { handleImageClick };
