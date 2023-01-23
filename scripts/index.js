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
const cardsList = document.querySelector("#cards-list");

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

const likeButton = document.querySelector(".card__like-button");

const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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

const profileAddCardTitleInput = profileAddCardForm.querySelector(
  "#profile-add-card-title-input"
);

const profileAddCardLinkInput = profileAddCardForm.querySelector(
  "#profile-add-card-link-input"
);
profileAddCardForm;
const profileAddCardDivider = document.querySelector(
  "#profile-add-card-divider"
);

const profileAddCardCreateBtn = document.querySelector(
  "#profile-add-card-create"
);

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
  openModal(profileAddCard);
});

profileAddCardCloseBtn.addEventListener("click", () => {
  closeModal(profileAddCard);
});

profileEditModalForm.addEventListener("submit", handleProfileEditSubmit);

profileAddCardForm.addEventListener("submit", handleProfileAddCardSubmit);

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
  const title = profileAddCardTitleInput.value;
  const link = profileAddCardLinkInput.value;
  console.log("titleValue", title);
  console.log("linkValue", link);
  renderCard({ title, link }, cardsList);
  closeModal(profileAddCard);
}

function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
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
  cardLikeBtn.addEventListener("click", handleLikeButton);
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

initialCards.forEach((cardData) => renderCard(cardData, cardsList));

/* -------------------------------------------------------------------------- */
