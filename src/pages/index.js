import "./index.css";
import {
  validationSettings,
  cardListEl,
  profileEditButton,
  modalEditProfileForm,
  profileAvatar,
  editAvatarIcon,
  avatarLink,
  profileName,
  profileDescription,
  addCardModal,
  modalAddCardForm,
  profileAddCardBtn,
  openEditAvatar,
  modalEditAvatar,
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
    /* ---------------------------- handleImageCLick ---------------------------- */
    (name, link) => {
      imagePopup.open(name, link);
    },
    /* ----------------------------- handleLikeClick ---------------------------- */
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
    /* ----------------------------- handleDelClick ----------------------------- */
    (cardId) => {
      delPopup.open();
      delPopup.setSubmitAction(() => {
        api.deleteCard(cardId).then(() => {
          cardElement.handleDelCard();
        });
        delPopup.close();
      });
    }
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

function submitAddCard({ name, link }) {
  api.addNewCard(name, link).then((res) => {
    renderCard(res, cardListEl);
    addFormPopup.close();
  });
}

function submitAvatar(data) {
  api.updateAvatar(data["profile-image-link"]).then(() => {
    profileAvatar.src = avatarLink.value;
    console.log(data);
  });
}

const editFormPopup = new PopupWithForm(
  "#modal-edit-profile",
  submitEditProfile
);
const avatarForm = new PopupWithForm("#avatar-form", submitAvatar);
const addFormPopup = new PopupWithForm("#modal-add-card", submitAddCard);
const imagePopup = new PopupWithImage({ popupSelector: "#modal-preview" });
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-subtitle",
});
const delPopup = new PopupWithConfirm({ popupSelector: "#confirm-del-modal" });

const editFormValidator = new FormValidator(
  validationSettings,
  modalEditProfileForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  modalAddCardForm
);
const avatarFormValidator = new FormValidator(
  validationSettings,
  modalEditAvatar
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/* -------------------------------- Listeners ------------------------------- */
profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

profileAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

openEditAvatar.addEventListener("click", () => {
  avatarForm.open("#avatar-form");
});
