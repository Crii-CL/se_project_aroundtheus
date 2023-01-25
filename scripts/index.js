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
/* ------------------------------ ^CardElements^ ------------------------------ */

/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const profileEditModalForm = document.querySelector("#profile-modal-form");

const profileEditClose = document.querySelector("#profile-edit-close");

const profileTitle = document.querySelector("#profile-title");

const profileSubtitle = document.querySelector("#profile-subtitle");

const profileTitleInput = document.querySelector("#profile-title-input");

const profileSubtitleInput = document.querySelector("#profile-subtitle-input");

const profileModalSaveBtn = profileEditModal.querySelector(
  ".modal__form_button"
);

const profileAddCardBtn = document.querySelector("#profile-add-card-button");
/* ----------------------------- ^Profile Section^ ---------------------------- */

/* -------------------------------- Add Card -------------------------------- */
const modalAddCardCloseBtn = document.querySelector(
  "#modal-add-card-close-button"
);
const modal = document.querySelector("#modal-add-card");

const modalContainer = document.querySelector("#modalcontainer-add-card");

const modalAddCardForm = document.querySelector("#modal-add-card-form");

const modalAddCardHeading = document.querySelector("#modal-add-card-heading");

const modalAddCardFieldset = document.querySelector("#modal-add-card-fieldset");

const modalAddCardTitleInput = modalAddCardForm.querySelector(
  "#modal-add-card-title-input"
);

const modalAddCardLinkInput = modalAddCardForm.querySelector(
  "#modal-add-card-link-input"
);

const modalAddCardDivider = document.querySelector("#modal-add-card-divider");

const modalAddCardCreateBtn = document.querySelector("#modal-add-card-create");
/* -------------------------------- ^AddCard^ ------------------------------- */

/* --------------------------------- Preview -------------------------------- */
const modalPreview = document.querySelector("#modalpreview");

const modalPreviewBlock = document.querySelector("#modalpreview-block");

const modalPreviewImage = document.querySelector("#modalpreview-image");

const modalPreviewTitle = document.querySelector("#modalpreview-title");

const modalPreviewCloseBtn = document.querySelector("#modal-close-preview");
/* -------------------------------- ^Preview^ ------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
});

profileEditClose.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileAddCardBtn.addEventListener("click", () => {
  openModal(modal);
});

modalAddCardCloseBtn.addEventListener("click", () => {
  closeModal(modal);
});

profileEditModalForm.addEventListener("submit", handleProfileEditSubmit);

modalAddCardForm.addEventListener("submit", handleProfileAddCardSubmit);

modalPreviewCloseBtn.addEventListener("click", () => {
  closeModal(modalPreviewBlock);
  closeModal(modalPreview);
});

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddCardSubmit(e) {
  e.preventDefault();
  const title = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  console.log("titleValue", title);
  console.log("linkValue", link);
  renderCard({ title, link }, cardListEl);
  closeModal(modal);
}

function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
}

function handleDelButton(e) {
  const card = this.closest("#card");
  const cardContainer = cardListEl;
  cardContainer.removeChild(card);
}

function handleImagePreview(cardData) {
  modalPreviewImage.src = cardData.link;
  modalPreviewImage.alt = cardData.name;
  modalPreviewTitle.textContent = cardData.name;
}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openProfileEditForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openProfileModal();
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
    openModal(modalPreviewBlock);
    openModal(modalPreview);
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

/* -------------------------------------------------------------------------- */
