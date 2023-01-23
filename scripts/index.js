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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileModalSaveBtn = profileEditModal.querySelector(
  ".modal__form_button"
);
const likeButton = document.querySelector(".card__like-button");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalForm = document.querySelector("#profile-modal-form");
const profileAddCardBtn = document.querySelector("#profile-add-card-button");
const profileAddCardCloseBtn = document.querySelector(
  "#profile-add-card-close-button"
);
const profileAddCard = document.querySelector("#profile-add-card");
const profileAddCardContainer = document.querySelector(
  "#profile-add-card-container"
);
const profileAddCardForm = document.querySelector("#profile-add-card-form");
const profileAddCardHeading = document.querySelector(
  "#profile-add-card-heading"
);
const profileAddCardFieldset = document.querySelector(
  "#profile-add-card-fieldset"
);
const profileAddCardTitle = document.querySelector(
  "#profile-add-card-title-input"
);
const profileAddCardSubtitle = document.querySelector(
  "#profile-add-card-subtitle-input"
);
const profileAddCardDivider = document.querySelector(
  "#profile-add-card-divider"
);
const profileAddCardCreateBtn = document.querySelector(
  "#profile-add-card-create"
);

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openModal);

profileEditClose.addEventListener("click", closeProfileModal);

modalForm.addEventListener("submit", handleProfileEditSubmit);

profileAddCardBtn.addEventListener("click", openProfileAddCardModal);

profileAddCardCloseBtn.addEventListener("click", closeProfileAddCardModal);

profileAddCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard({
    name: title,
    link: link,
  });
  console.log("submitted");
  closeProfileAddCardModal();
});

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeProfileModal();
}

function handleProfileAddCardCreate(e) {
  e.preventDefault();
}
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// function toggleLike() {
//   likeButton.classList.add("card__liked");
// }

function openProfileModal() {
  profileEditModal.classList.add("modal_opened");
}

function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

function openProfileAddCardModal() {
  profileAddCard.classList.add("modal_opened");
}

function closeProfileAddCardModal() {
  profileAddCard.classList.remove("modal_opened");
}

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
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard() {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  //This is my loop
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

/* -------------------------------------------------------------------------- */
