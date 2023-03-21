import "./index.css";

import {
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
  likes,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";

let cardSection;
openProfileEditForm;
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
});

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

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

profileImg.addEventListener("click", () => {
  editProfileImg;
});

// function submitEditProfile(inputValues) {
//   userInfo.setUserInfo({
//     name: inputValues.title,
//     about: inputValues.subtitle,
//   });
// }

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).renderCard();
  cardListEl.prepend(cardElement);
}

function openProfileEditForm() {
  const { name, about } = userInfo.getUserInfo();
  profileName.value = name;
  profileDescription.value = about;
  editFormPopup.open();
}

function submitEditProfile(inputValues) {
  api.updateProfileInfo(inputValues.title, inputValues.subtitle).then(() => {
    userInfo.setUserInfo({
      name: inputValues.title,
      about: inputValues.subtitle,
    });
  });
}

// function editProfileImg(e) {
//   if (e.target.classList.contains(".profile__image")) {
//   }
// }

function submitAddCard(inputValues) {
  api.addNewCard(inputValues.name, inputValues.link).then(() => {
    renderCard({ name: inputValues.name, link: inputValues.link }, cardListEl);
    addFormPopup.close();
  });
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleLikeCounter(inputValues) {
  api.showLikes(inputValues.likes).then((res) => {
    likes.textContent = likes.value;
  });
}

const editFormValidator = new FormValidator(
  validationSettings,
  modalEditProfileForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  modalAddCardForm
);

const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const editFormPopup = new PopupWithForm(
  "#modal-edit-profile",
  submitEditProfile
);
const addFormPopup = new PopupWithForm("#modal-add-card", submitAddCard);
const imagePopup = new PopupWithImage({ popupSelector: "#modal-preview" });
const likeCounter = new Api("#like-counter", handleLikeCounter);
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-subtitle",
});

// Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
//   ([initialCards, userInfo]) => {
//   }
// );
