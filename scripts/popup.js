export default class Popup {
  contructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      // const openedPopup = document.querySelector(".modal_opened");
      close(this._popupElement);
    }
  }

  _setEventListeners() {
    if (this._popupElement.open()) {
      this._popupElement.addEventListener("keydown", closeByEscape);
      this._popupElement.addEventListener("mousedown", handleOverlay);
    } else if (this._popupElement.close()) {
      this._popupElement.removeEventListener("keydown", closeByEscape);
      this._popupElement.removeEventListener("mousedown", handleOverlay);
    }
  }
}

const newPopup = new Popup("modal");
newPopup.open();
newPopup.close();
newPopup._handleEscClose();
newPopup._setEventListeners();
