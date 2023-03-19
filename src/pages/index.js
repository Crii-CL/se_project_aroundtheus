import "./index.css";

import {
  initialCards,
  validationSettings,
  cardListEl,
  profileEditButton,
  modalEditProfileForm,
  modalEditTitleInput,
  modalEditSubtitleInput,
  addCardModal,
  modalAddCardForm,
  profileAddCardBtn,
  profileImg,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});

//get cards
//send card data out
let cardSection;

api.getInitialCards().then((res) => {
  cardSection = new Section(
    {
      items: res,
      renderer: renderCard,
    },
    cardListEl
  );
  cardSection.renderItems();
});

// Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
//   ([initialCards, userInfo]) => {

//   }
// );

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

profileImg.addEventListener("click", () => {
  editProfileImg;
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

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function editProfileImg(e) {
  if (e.target.classList.contains(".profile__image")) {
  }
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).renderCard();
  cardListEl.prepend(cardElement);
}

/* --------------------------------- Section.js -------------------------------- */

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
