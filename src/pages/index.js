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
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2fee5a13-ea32-4770-a359-bbaf2b3da470",
    "Content-Type": "application/json",
  },
});

let userId;
let cardSection;

api
  .getAppInfo()
  .then(([cardsResponse, userResponse]) => {
    userId = userResponse._id;
    userInfo.setUserInfo(userResponse);
    userInfo.setAvatar(userResponse);

    cardSection = new Section(
      {
        items: cardsResponse,
        renderer: renderCard,
      },
      cardListEl
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.log(error);
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
        api
          .addLikes(cardId)
          .then((res) => {
            cardElement.updateLikes(res.likes);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api
          .removeLikes(cardId)
          .then((res) => {
            cardElement.updateLikes(res.likes);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    /* ----------------------------- handleDelClick ----------------------------- */
    (cardId) => {
      delPopup.setSubmitAction(() => {
        delPopup.showLoading();
        return api
          .deleteCard(cardId)
          .then(() => {
            cardElement.removeCard();
            delPopup.close();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            delPopup.hideLoading();
          });
      });
      delPopup.open();
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
  editFormPopup.showLoading();
  return api
    .updateProfileInfo(inputValues.title, inputValues.subtitle)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        about: inputValues.subtitle,
      });
      editFormPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editFormPopup.hideLoading();
    });
}

function submitAddCard({ name, link }) {
  addFormPopup.showLoading();
  return api
    .addNewCard(name, link)
    .then((res) => {
      renderCard(res, cardListEl);
    })
    .then(() => {
      this.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addFormPopup.hideLoading();
    });
}

function submitAvatar({ avatar }) {
  avatarForm.showLoading();
  return api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setAvatar({ avatar: res.avatar });
    })
    .then(() => {
      this.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      avatarForm.hideLoading();
    });
}
/* -------------------------- Popup Instantiations -------------------------- */
const avatarForm = new PopupWithForm("#avatar-form", {
  handleFormSubmit: submitAvatar,
  loadingButtonText: "Saving...",
});
const editFormPopup = new PopupWithForm("#modal-edit-profile", {
  handleFormSubmit: submitEditProfile,
  loadingButtonText: "Saving...",
});
const addFormPopup = new PopupWithForm("#modal-add-card", {
  handleFormSubmit: submitAddCard,
  loadingButtonText: "Saving...",
});
const delPopup = new PopupWithConfirm("#confirm-del-modal", "Saving...");
const imagePopup = new PopupWithImage({ popupSelector: "#modal-preview" });
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-subtitle",
  avatarSelector: ".profile__image",
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
