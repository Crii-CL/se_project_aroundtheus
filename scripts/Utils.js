// class Popup {
//   constructor(element) {
//     this._element = element;
//   }

//   _openPopup() {
//     this._element.classList.add("modal_opened");
//     document.addEventListener("keydown", this._handleEscClose);
//     document.addEventListener("mousedown", this._handleOverlayClose);
//   }

//   _closePopup() {
//     this._element.classList.remove("modal_opened");
//     document.removeEventListener("keydown", this._handleEscClose);
//     document.removeEventListener("mousedown", this._handleOverlayClose);
//   }

//   _handleEscClose(e) {
//     if (e.key === "Escape") {
//       const modal = document.querySelector("modal");
//       modal._closePopup();
//     }
//   }

//   _handleOverlayClose(e) {
//     if (e.target.classList.contains("modal_opened")) {
//       this._element.closePopup();
//     }
//   }

//   _handleProfileEditSubmit(e) {
//     e.preventDefault();
//     profileTitle.textContent = modalEditTitleInput.value;
//     profileSubtitle.textContent = modalEditSubtitleInput.value;
//     closePopup(modalEditProfile);
//   }

//   _handleProfileAddCardSubmit(e) {
//     e.preventDefault();
//     const name = modalAddCardTitleInput.value;
//     const link = modalAddCardLinkInput.value;
//     renderCard({ name, link }, cardListEl);
//     closePopup(addCardModal);
//     e.target.reset();
//   }
// }

/* ------------------------------------ . ----------------------------------- */
const Utils = {
  closeByEscape: function (e) {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector(".modal_opened");
      closePopup(openedPopup);
    }
  },

  handleOverlay: function (e) {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(e.target);
    }
  },

  handleProfileEditSubmit: function (e) {
    e.preventDefault();
    profileTitle.textContent = modalEditTitleInput.value;
    profileSubtitle.textContent = modalEditSubtitleInput.value;
    closePopup(modalEditProfile);
  },

  handleProfileAddCardSubmit: function (e) {
    e.preventDefault();
    const name = modalAddCardTitleInput.value;
    const link = modalAddCardLinkInput.value;
    renderCard({ name, link }, cardListEl);
    closePopup(addCardModal);
    e.target.reset();
  },
  openPopup: function (modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("mousedown", handleOverlay);
  },

  closePopup: function (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeByEscape);
    document.removeEventListener("mousedown", handleOverlay);
  },

  openProfileEditForm: function () {
    modalEditTitleInput.value = profileTitle.textContent;
    modalEditSubtitleInput.value = profileSubtitle.textContent;
    openPopup(modalEditProfile);
  },
};

export default Utils;
