import "./index.css";
import {
  validationSettings,
  cardListEl,
  profileEditButton,
  modalEditProfileForm,
  profileAvatar,
  profileName,
  profileDescription,
  addCardModal,
  modalAddCardForm,
  modalAddCardBtn,
  openEditAvatar,
  modalEditAvatar,
  editProfileSubmitBtn,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";
import Popup from "../components/Popup.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});

let userId;
let cardSection;

api.getAppInfo().then(([cardsResponse, userResponse]) => {
  userId = userResponse._id;
  userInfo.setUserInfo(userResponse);

  cardSection = new Section(
    {
      items: cardsResponse,
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
        delPopupLoad.showLoading();
        return api
          .deleteCard(cardId)
          .then(() => {
            cardElement.handleDelCard();
            delPopup.close();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            delPopupLoad.hideLoading();
          });
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
  editFormLoad.showLoading();
  return api
    .updateProfileInfo(inputValues.title, inputValues.subtitle)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        about: inputValues.subtitle,
      });
      editProfileSubmitBtn.textContent = "Save";
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editFormLoad.hideLoading();
    });
}

function submitAddCard({ name, link }) {
  addFormLoad.showLoading();
  return api
    .addNewCard(name, link)
    .then((res) => {
      renderCard(res, cardListEl);
      addFormPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addFormLoad.hideLoading();
    });
}

function submitAvatar(data) {
  avatarFormLoad.showLoading();
  return api
    .updateAvatar(data["profile-image-link"])
    .then(() => {
      profileAvatar.src = data["profile-image-link"];
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      avatarFormLoad.hideLoading();
    });
}

/* -------------------------- Popup Instantiations -------------------------- */
// const avatarForm = new PopupWithForm("#avatar-form", {
//   handleFormSubmit: submitAvatar,
//   loadingButtonText: "Saving...",
// });
// const editFormPopup = new PopupWithForm(
//   "#modal-edit-profile",
//   {handleFormSubmit: submitEditProfile, loadingButtonText: "}
// );
// const addFormPopup = new PopupWithForm("#modal-add-card", {
//   handleFormSubmit: submitAddCard,
//   loadingButtonText: "Saving...",
// });

const avatarForm = new PopupWithForm("#avatar-form", submitAvatar);
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
const delPopup = new PopupWithConfirm({ popupSelector: "#confirm-del-modal" });

/* ---------------------------------- Load ---------------------------------- */
const avatarFormLoad = new Popup({
  popupSelector: "#avatar-form",
  loadingButtonText: "Saving...",
});
const editFormLoad = new Popup({
  popupSelector: "#modal-edit-profile",
  loadingButtonText: "Saving...",
});
const addFormLoad = new Popup({
  popupSelector: "#modal-add-card",
  loadingButtonText: "Saving...",
});
const delPopupLoad = new Popup({
  popupSelector: "#confirm-del-modal",
  loadingButtonText: "Saving...",
});

/* ------------------------------- Validators ------------------------------- */
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

modalAddCardBtn.addEventListener("click", () => {
  addFormPopup.open(addCardModal);
});

openEditAvatar.addEventListener("click", () => {
  avatarForm.open("#avatar-form");
});
