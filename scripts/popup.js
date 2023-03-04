export default class Popup {
  contructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    // document.addEventListener("keydown", closeByEscape);
    // document.addEventListener("mousedown", handleOverlay);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeByEscape);
    document.removeEventListener("mousedown", handleOverlay);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      // const openedPopup = document.querySelector(".modal_opened");
      close(this._popupElement);
  }

  setEventListeners() {
    if (this._popupElement.open()) {
      this._popupElement.addEventListener("keydown", closeByEscape);
      this._popupElement.addEventListener("mousedown", handleOverlay);
    } else if (this._popupElement.close()) {
      this._popupElement.removeEventListener("keydown", closeByEscape);
      this._popupElement.removeEventListener("mousedown", handleOverlay);
    }
  }
}
