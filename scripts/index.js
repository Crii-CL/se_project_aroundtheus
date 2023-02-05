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
const likeButton = document.querySelector(".card__like-button");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

const cardDelBtn = document.querySelector("#card-delete-button");

const card = document.querySelector("#card");

const closeButtons = document.querySelectorAll(".modal__close");

/* ----------------------------- Modal Elements ----------------------------- */

const modal = document.querySelectorAll(".modal");

const modalFormInput = document.querySelectorAll(".modal__form-input");

const modalFormError = document.querySelector(".modal__form-input_error");

const modalForm = document.querySelectorAll(".modal__form");

const modalOpened = document.querySelectorAll(".modal_opened");

/* ------------------------------ ^CardElements^ ------------------------------ */

/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");

const modalEditProfile = document.querySelector("#modal-edit-profile");

const modalEditProfileForm = document.querySelector("#modal-profile-form");

const modalProfileEditClose = document.querySelector(
  "#modal-profile-edit-close"
);

const profileTitle = document.querySelector("#profile-title");

const profileSubtitle = document.querySelector("#profile-subtitle");

const modalEditTitleInput = document.querySelector("#modal-edit-title-input");

const modalEditSubtitleInput = document.querySelector(
  "#modal-edit-subtitle-input"
);

const profileModalSaveBtn = modalEditProfile.querySelector(
  ".modal__form_button"
);

const profileAddCardBtn = document.querySelector("#profile-add-card-button");
/* ----------------------------- ^Profile Section^ ---------------------------- */

/* -------------------------------- Add Card -------------------------------- */
const modalAddCardCloseBtn = document.querySelector(
  "#modal-add-card-close-button"
);
const addCardModal = document.querySelector("#modal-add-card");

const modalAddCardForm = document.querySelector("#modal-add-card-form");

const modalAddCardHeading = document.querySelector("#modal-add-card-heading");

const modalAddCardFieldset = document.querySelector("#modal-add-card-fieldset");

const modalAddCardTitleInput = modalAddCardForm.querySelector(
  "#modal-add-card-title"
);

const modalAddCardLinkInput = modalAddCardForm.querySelector(
  "#modal-add-card-link"
);

const modalAddCardDivider = document.querySelector("#modal-add-card-divider");

const modalAddCardCreateBtn = document.querySelector("#modal-add-card-create");
/* -------------------------------- ^AddCard^ ------------------------------- */

/* --------------------------------- Preview -------------------------------- */
const modalPreview = document.querySelector("#modalpreview");

const modalPreviewContainer = document.querySelector("#modalpreview-container");

const modalPreviewImage = document.querySelector("#modalpreview-image");

const modalPreviewTitle = document.querySelector("#modalpreview-title");

const modalPreviewCloseBtn = document.querySelector("#modal-close-preview");
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

modalAddCardCloseBtn.addEventListener("click", modalCloseButtonReset);

document.addEventListener("click", modalCloseOverlay);

document.addEventListener("keydown", modalEscape);
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function modalEscape(e) {
  if (e.key === "Escape") {
    document.querySelector(".modal_opened").classList.remove("modal_opened");
  }
}

function modalCloseOverlay(e) {
  e.target.classList.remove("modal_opened");
}

function modalCloseButtonReset() {
  closePopup(addCardModal);
  modalAddCardTitleInput.value = "";
  modalAddCardLinkInput.value = "";
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
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.classList.add("modal_closing");
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
  const cardDelBtn = cardElement.querySelector(".card__delete_button");
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

const showError = (input, errorMessage) => {
  input.classList.add("modal__form-input_type_error");
  modalFormError.textContent = errorMessage;
  modalFormInput.classList.add("modal__form-input_error_active");
};

const hideError = (input) => {
  input.classList.remove("modal__form-input_type_error");
};

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

/* -------------------------------------------------------------------------- */
