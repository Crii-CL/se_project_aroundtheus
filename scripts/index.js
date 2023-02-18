import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Card Elements ----------------------------- */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

const closeButtons = document.querySelectorAll(".modal__close");

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

const profileAddCardBtn = document.querySelector("#profile-add-card-button");
/* ----------------------------- ^Profile Section^ ---------------------------- */

/* -------------------------------- Add Card -------------------------------- */
const addCardModal = document.querySelector("#modal-add-card");

const modalAddCardForm = document.querySelector("#modal-add-card-form");

const modalAddCardTitleInput = modalAddCardForm.querySelector(
  "#modal-add-card-title"
);

const modalAddCardLinkInput = modalAddCardForm.querySelector(
  "#modal-add-card-link"
);

/* -------------------------------- ^AddCard^ ------------------------------- */

/* --------------------------------- Preview -------------------------------- */
const modalPreview = document.querySelector("#modal-preview");

const modalPreviewImage = document.querySelector("#modal-preview-image");

const modalPreviewTitle = document.querySelector("#modal-preview-title");

/* -------------------------------- ^Preview^ ------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  openPopup(addCardModal);
});

modalEditProfileForm.addEventListener("submit", handleProfileEditSubmit);

modalAddCardForm.addEventListener("submit", handleProfileAddCardSubmit);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalEditTitleInput.value;
  profileSubtitle.textContent = modalEditSubtitleInput.value;
  closePopup(modalEditProfile);
}

function handleProfileAddCardSubmit(e) {
  e.preventDefault();
  const name = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  e.target.reset();
}

function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
}

function handleDelButton(e) {
  const card = e.target.closest("#card");
  card.remove();
}

function handleImagePreview(cardData) {
  modalPreviewImage.src = cardData.link;
  modalPreviewImage.alt = cardData.name;
  modalPreviewTitle.textContent = cardData.name;
}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", handleOverlay);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", handleOverlay);
}

function openProfileEditForm() {
  modalEditTitleInput.value = profileTitle.textContent;
  modalEditSubtitleInput.value = profileSubtitle.textContent;
  openPopup(modalEditProfile);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDelBtn = cardElement.querySelector(".card__delete-button");
  cardDelBtn.addEventListener("click", handleDelButton);
  cardLikeBtn.addEventListener("click", handleLikeButton);
  cardImageEl.addEventListener("click", () => {
    handleImagePreview(cardData);
    openPopup(modalPreview);
  });
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// const popups = document.querySelectorAll(".modal");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (e) => {
//     if (e.target.classList.contains("modal_opened")) {
//       closePopup(popup);
//     }
//     if (e.target.classList.contains("modal__close")) {
//       closePopup(popup);
//     }
//   });
// });

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
/* ------------------------------ Edit Profile ------------------------------ */
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

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
/* ----------------------------- ^Edit Profile^ ----------------------------- */
