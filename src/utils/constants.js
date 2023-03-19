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

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

/* ------------------------------ Card Elements ----------------------------- */
const cardListEl = document.querySelector(".cards__list");
/* ----------------------------- Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const modalEditProfileForm = document.querySelector("#modal-profile-form");
const profileName = document.querySelector("#modal-edit-title-input");
const profileDescription = document.querySelector("#modal-edit-subtitle-input");
/* -------------------------------- Add Card -------------------------------- */
const addCardModal = document.querySelector("#modal-add-card");
const modalAddCardForm = document.querySelector("#modal-add-card-form");
const profileAddCardBtn = document.querySelector("#profile-add-card-button");
/* ---------------------------- Profile Elements ---------------------------- */
const profileImg = document.querySelector(".profile__image");
/* ------------------------------- AvatarForm ------------------------------- */
const avatarForm = document.querySelector("#avatar-form");

export {
  initialCards,
  validationSettings,
  cardListEl,
  profileEditButton,
  modalEditProfileForm,
  profileName,
  profileDescription,
  addCardModal,
  modalAddCardForm,
  profileAddCardBtn,
  profileImg,
  avatarForm,
};
