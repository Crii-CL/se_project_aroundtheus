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
  submitDelBtn,
  editAvatar,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";

openProfileEditForm;
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});

let userId;

api.getUserInfo().then((res) => {
  userId = res._id;
  userInfo.setUserInfo(res);
});

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

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    userId,
    "#card-template",
    handleImageClick,
    (cardId, isLiked) => {
      if (!isLiked) {
        api.addLikes(cardId).then((res) => {
          cardElement.handleLikeBtn(res);
        });
      } else {
        api.removeLikes(cardId).then((res) => {
          cardElement.handleLikeBtn(res);
        });
      }
    },
    handleDelClick
  );
  cardListEl.prepend(cardElement.renderCard());
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

function submitAddCard(inputValues) {
  api.addNewCard(inputValues.name, inputValues.link).then(() => {
    renderCard({ name: inputValues.name, link: inputValues.link }, cardListEl);
    addFormPopup.close();
  });
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleDelClick(cardData) {
  delPopup.open();
  console.log(cardData);
}

function submitDelCard() {
  api.deleteCard();
  delPopup.close();
}

// api.getAppInfo().then(([cards, userInfo]) => {});

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
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-subtitle",
});
const delPopup = new PopupWithConfirm({
  popupSelector: "#confirm-del-modal",
});

/* -------------------------------- Listeners ------------------------------- */
profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

editAvatar.addEventListener("click", () => {
  editProfileImg;
});
